module nft_marketplace::nft_marketplace {
    use sui::object::{Self, UID};
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};
    use sui::coin::{Self, Coin};
    use sui::sui::SUI;
    use sui::event;
    use std::string::{Self, String};
    use sui::url::{Self, Url};
    use sui::package;
    use sui::display;
    use std::vector;
    use std::option::{Self, Option};
    use sui::table::{Self, Table};

    // Error codes
    const EInsufficientPayment: u64 = 1;
    const ENotOwner: u64 = 2;
    const ENFTNotFound: u64 = 3;
    const ECollectionNotFound: u64 = 4;
    const ECollectionAlreadyExists: u64 = 5;

    // NFT price in MIST (0.01 SUI = 10_000_000 MIST)
    const NFT_PRICE: u64 = 10_000_000;

    // Collection struct
    public struct Collection has key, store {
        id: UID,
        name: String,
        description: String,
        creator: address,
        nft_count: u64,
        created_at: u64,
    }

    // NFT struct with collection reference
    public struct NFT has key, store {
        id: UID,
        name: String,
        description: String,
        image_url: Url,
        creator: address,
        rarity: String,
        collection_id: Option<address>,
        collection_name: Option<String>,
    }

    // Marketplace struct with collections tracking
    public struct Marketplace has key {
        id: UID,
        owner: address,
        nfts_minted: u64,
        total_revenue: u64,
        collections: Table<String, address>, // collection_name -> collection_id
        collections_count: u64,
    }

    // One-time witness for creating Display
    public struct NFT_MARKETPLACE has drop {}

    // Events
    public struct NFTMinted has copy, drop {
        nft_id: address,
        name: String,
        creator: address,
        price: u64,
        collection_id: Option<address>,
        collection_name: Option<String>,
    }

    public struct NFTTransferred has copy, drop {
        nft_id: address,
        from: address,
        to: address,
    }

    public struct CollectionCreated has copy, drop {
        collection_id: address,
        name: String,
        creator: address,
    }

    // Initialize the marketplace
    fun init(otw: NFT_MARKETPLACE, ctx: &mut TxContext) {
        let keys = vector[
            string::utf8(b"name"),
            string::utf8(b"description"),
            string::utf8(b"image_url"),
            string::utf8(b"creator"),
            string::utf8(b"rarity"),
            string::utf8(b"collection_name"),
        ];

        let values = vector[
            string::utf8(b"{name}"),
            string::utf8(b"{description}"),
            string::utf8(b"{image_url}"),
            string::utf8(b"{creator}"),
            string::utf8(b"{rarity}"),
            string::utf8(b"{collection_name}"),
        ];

        let publisher = package::claim(otw, ctx);
        let mut display = display::new_with_fields<NFT>(&publisher, keys, values, ctx);
        display::update_version(&mut display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(display, tx_context::sender(ctx));

        let marketplace = Marketplace {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            nfts_minted: 0,
            total_revenue: 0,
            collections: table::new(ctx),
            collections_count: 0,
        };

        transfer::share_object(marketplace);
    }

    // Create a new collection with meaningful metadata
    public entry fun create_collection(
        marketplace: &mut Marketplace,
        name: vector<u8>,
        description: vector<u8>,
        ctx: &mut TxContext
    ) {
        let collection_name = string::utf8(name);
        
        // Check if collection already exists
        assert!(!table::contains(&marketplace.collections, collection_name), ECollectionAlreadyExists);

        // Create collection with meaningful description
        let final_description = if (vector::length(&description) == 0) {
            string::utf8(b"A curated collection of unique digital assets")
        } else {
            string::utf8(description)
        };

        let collection = Collection {
            id: object::new(ctx),
            name: collection_name,
            description: final_description,
            creator: tx_context::sender(ctx),
            nft_count: 0,
            created_at: tx_context::epoch(ctx),
        };

        let collection_id = object::uid_to_address(&collection.id);
        
        // Add collection to marketplace tracking
        table::add(&mut marketplace.collections, collection_name, collection_id);
        marketplace.collections_count = marketplace.collections_count + 1;

        // Emit event
        event::emit(CollectionCreated {
            collection_id,
            name: collection_name,
            creator: tx_context::sender(ctx),
        });

        // Transfer collection to creator
        transfer::public_transfer(collection, tx_context::sender(ctx));
    }

    // Update collection NFT count (can be called by collection owner)
    public entry fun increment_collection_nft_count(collection: &mut Collection) {
        collection.nft_count = collection.nft_count + 1;
    }

    // Helper function to get random collection from predefined list
    fun get_random_collection_name(marketplace: &Marketplace, ctx: &TxContext): String {
        let mut collection_names = vector::empty<vector<u8>>();
        vector::push_back(&mut collection_names, b"Mystic Apes");
        vector::push_back(&mut collection_names, b"Cosmic Beasts");
        vector::push_back(&mut collection_names, b"Digital Legends");
        vector::push_back(&mut collection_names, b"Crypto Warriors");
        vector::push_back(&mut collection_names, b"Neon Spirits");
        vector::push_back(&mut collection_names, b"Pixel Guardians");
        vector::push_back(&mut collection_names, b"Quantum Phantoms");
        vector::push_back(&mut collection_names, b"Stellar Creatures");

        // Use epoch + nfts_minted for better randomness across different mints
        let random_seed = tx_context::epoch(ctx) + marketplace.nfts_minted;
        let collection_index = (random_seed % 8) as u64;

        let collection_bytes = *vector::borrow(&collection_names, collection_index);
        string::utf8(collection_bytes)
    }

    // Mint NFT with optional collection and dynamic naming
    public entry fun mint_nft(
        marketplace: &mut Marketplace,
        base_name: vector<u8>, // Base name for the NFT (e.g., "test")
        description: vector<u8>,
        image_url: vector<u8>,
        rarity: vector<u8>,
        mut collection_name: Option<vector<u8>>,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        assert!(coin::value(&payment) >= NFT_PRICE, EInsufficientPayment);

        let (collection_id, collection_name_string, serial_number) = if (option::is_some(&collection_name)) {
            let name_bytes = option::extract(&mut collection_name);
            let name_str = string::utf8(name_bytes);
            
            if (table::contains(&marketplace.collections, name_str)) {
                // Collection exists, get current count and increment
                let coll_id = *table::borrow(&marketplace.collections, name_str);
                // For existing collections, we'll use marketplace NFT count as approximation
                // In practice, you'd want to track per-collection counts more precisely
                let current_count = marketplace.nfts_minted + 1;
                (option::some(coll_id), option::some(name_str), current_count)
            } else {
                // Create collection automatically if it doesn't exist
                let collection = Collection {
                    id: object::new(ctx),
                    name: name_str,
                    description: string::utf8(b"A curated collection of unique digital assets"),
                    creator: tx_context::sender(ctx),
                    nft_count: 1, // Start with 1 since we're adding an NFT
                    created_at: tx_context::epoch(ctx),
                };

                let coll_id = object::uid_to_address(&collection.id);
                
                // Add to marketplace tracking
                table::add(&mut marketplace.collections, name_str, coll_id);
                marketplace.collections_count = marketplace.collections_count + 1;

                // Emit collection created event
                event::emit(CollectionCreated {
                    collection_id: coll_id,
                    name: name_str,
                    creator: tx_context::sender(ctx),
                });

                // Transfer collection to creator
                transfer::public_transfer(collection, tx_context::sender(ctx));

                (option::some(coll_id), option::some(name_str), 1u64)
            }
        } else {
            // No collection - use global marketplace count for numbering
            let global_count = marketplace.nfts_minted + 1;
            (option::none(), option::none(), global_count)
        };

        // Generate dynamic NFT name with serial number
        let base_name_str = string::utf8(base_name);
        let serial_str = u64_to_string(serial_number);
        let hash_str = string::utf8(b" #");
        
        // Concatenate: base_name + " #" + serial_number
        let mut final_name = base_name_str;
        string::append(&mut final_name, hash_str);
        string::append(&mut final_name, serial_str);

        let nft = NFT {
            id: object::new(ctx),
            name: final_name, // Use dynamically generated name
            description: string::utf8(description),
            image_url: url::new_unsafe_from_bytes(image_url),
            creator: tx_context::sender(ctx),
            rarity: string::utf8(rarity),
            collection_id,
            collection_name: collection_name_string,
        };

        let nft_id = object::uid_to_address(&nft.id);
        
        // Update marketplace stats
        marketplace.nfts_minted = marketplace.nfts_minted + 1;
        marketplace.total_revenue = marketplace.total_revenue + NFT_PRICE;

        // Emit event
        event::emit(NFTMinted {
            nft_id,
            name: nft.name,
            creator: tx_context::sender(ctx),
            price: NFT_PRICE,
            collection_id: nft.collection_id,
            collection_name: nft.collection_name,
        });

        // Transfer payment to marketplace owner
        transfer::public_transfer(payment, marketplace.owner);

        // Transfer NFT to minter
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

    // Free mint NFT for testing (no payment required)
    public entry fun mint_free_nft(
        marketplace: &mut Marketplace,
        ctx: &mut TxContext
    ) {
        let collection_name = get_random_collection_name(marketplace, ctx);
        let serial_number = marketplace.nfts_minted + 1;
        
        // Auto-create Random collection if it doesnt exist
        if (!table::contains(&marketplace.collections, collection_name)) {
            let collection = Collection {
                id: object::new(ctx),
                name: collection_name,
                description: string::utf8(b"Random collection of free NFTs for testing"),
                creator: tx_context::sender(ctx),
                nft_count: 1,
                created_at: tx_context::epoch(ctx),
            };
            
            let coll_id = object::uid_to_address(&collection.id);
            table::add(&mut marketplace.collections, collection_name, coll_id);
            marketplace.collections_count = marketplace.collections_count + 1;
            
            event::emit(CollectionCreated {
                collection_id: coll_id,
                name: collection_name,
                creator: tx_context::sender(ctx),
            });
            
            transfer::public_transfer(collection, tx_context::sender(ctx));
        };
        
        // Generate random-ish base name
        let random_names = vector[b"Ape", b"Monkey", b"Chimp", b"Gorilla", b"Baboon"];
        let name_index = (tx_context::epoch(ctx) % 5) as u8;
        let base_name = *vector::borrow(&random_names, (name_index as u64));
        let base_name_str = string::utf8(base_name);
        let serial_str = u64_to_string(serial_number);
        let hash_str = string::utf8(b" #");
        
        // Create final name: BaseName + " #" + serial_number
        let mut final_name = base_name_str;
        string::append(&mut final_name, hash_str);
        string::append(&mut final_name, serial_str);
        
        let nft = NFT {
            id: object::new(ctx),
            name: final_name,
            description: string::utf8(b"A randomly generated NFT from the Random collection"),
            image_url: url::new_unsafe_from_bytes(b"https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg"),
            creator: tx_context::sender(ctx),
            rarity: string::utf8(b"Common"),
            collection_id: option::some(*table::borrow(&marketplace.collections, collection_name)),
            collection_name: option::some(collection_name),
        };
        
        let nft_id = object::uid_to_address(&nft.id);
        marketplace.nfts_minted = marketplace.nfts_minted + 1;
        
        event::emit(NFTMinted {
            nft_id,
            name: nft.name,
            creator: tx_context::sender(ctx),
            price: 0, // Free!
            collection_id: nft.collection_id,
            collection_name: nft.collection_name,
        });
        
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }


    // Batch mint multiple free NFTs at once
    public entry fun batch_mint_free_nfts(
        marketplace: &mut Marketplace,
        count: u8, // Number of NFTs to mint (max 10)
        ctx: &mut TxContext
    ) {
        assert!(count > 0 && count <= 10, EInsufficientPayment); // Reuse error code
        
        let collection_name = get_random_collection_name(marketplace, ctx);
        
        // Auto-create collection if it doesnt exist
        if (!table::contains(&marketplace.collections, collection_name)) {
            let collection = Collection {
                id: object::new(ctx),
                name: collection_name,
                description: string::utf8(b"Random collection of free NFTs for testing"),
                creator: tx_context::sender(ctx),
                nft_count: 1,
                created_at: tx_context::epoch(ctx),
            };
            
            let coll_id = object::uid_to_address(&collection.id);
            table::add(&mut marketplace.collections, collection_name, coll_id);
            marketplace.collections_count = marketplace.collections_count + 1;
            
            event::emit(CollectionCreated {
                collection_id: coll_id,
                name: collection_name,
                creator: tx_context::sender(ctx),
            });
            
            transfer::public_transfer(collection, tx_context::sender(ctx));
        };
        
        let random_names = vector[b"Ape", b"Monkey", b"Chimp", b"Gorilla", b"Baboon", b"Orangutan", b"Lemur", b"Macaque", b"Bonobo", b"Gibbon"];
        let mut i = 0u8;
        
        while (i < count) {
            let serial_number = marketplace.nfts_minted + 1;
            
            // Use different name patterns for variety
            let name_index = ((tx_context::epoch(ctx) + (i as u64)) % 10) as u8;
            let base_name = *vector::borrow(&random_names, (name_index as u64));
            let base_name_str = string::utf8(base_name);
            let serial_str = u64_to_string(serial_number);
            let hash_str = string::utf8(b" #");
            
            // Create final name
            let mut final_name = base_name_str;
            string::append(&mut final_name, hash_str);
            string::append(&mut final_name, serial_str);
            
            let nft = NFT {
                id: object::new(ctx),
                name: final_name,
                description: string::utf8(b"A randomly generated NFT from the Random collection"),
                image_url: url::new_unsafe_from_bytes(b"https://img.freepik.com/free-vector/hand-drawn-nft-style-ape-illustration_23-2149622024.jpg"),
                creator: tx_context::sender(ctx),
                rarity: string::utf8(b"Common"),
                collection_id: option::some(*table::borrow(&marketplace.collections, collection_name)),
                collection_name: option::some(collection_name),
            };
            
            let nft_id = object::uid_to_address(&nft.id);
            marketplace.nfts_minted = marketplace.nfts_minted + 1;
            
            event::emit(NFTMinted {
                nft_id,
                name: nft.name,
                creator: tx_context::sender(ctx),
                price: 0, // Free!
                collection_id: nft.collection_id,
                collection_name: nft.collection_name,
            });
            
            transfer::public_transfer(nft, tx_context::sender(ctx));
            i = i + 1;
        };
    }


    // Transfer NFT to another address
    public entry fun transfer_nft(nft: NFT, recipient: address, ctx: &mut TxContext) {
        let nft_id = object::uid_to_address(&nft.id);
        
        event::emit(NFTTransferred {
            nft_id,
            from: tx_context::sender(ctx),
            to: recipient,
        });

        transfer::public_transfer(nft, recipient);
    }

    // Get NFT details
    public fun get_nft_info(nft: &NFT): (String, String, Url, address, String, Option<String>) {
        (nft.name, nft.description, nft.image_url, nft.creator, nft.rarity, nft.collection_name)
    }

    // Get collection details
    public fun get_collection_info(collection: &Collection): (String, String, address, u64, u64) {
        (collection.name, collection.description, collection.creator, collection.nft_count, collection.created_at)
    }

    // Get marketplace stats
    public fun get_marketplace_stats(marketplace: &Marketplace): (u64, u64, u64) {
        (marketplace.nfts_minted, marketplace.total_revenue, marketplace.collections_count)
    }

    // Get all collections (returns collection names)
    public fun get_collections(marketplace: &Marketplace): &Table<String, address> {
        &marketplace.collections
    }

    // Helper function to convert u64 to string
    fun u64_to_string(value: u64): String {
        if (value == 0) {
            return string::utf8(b"0")
        };
        
        let mut digits = vector::empty<u8>();
        let mut n = value;
        
        while (n > 0) {
            let digit = ((n % 10) as u8) + 48; // Convert to ASCII
            vector::push_back(&mut digits, digit);
            n = n / 10;
        };
        
        // Reverse the digits since we built them backwards
        vector::reverse(&mut digits);
        string::utf8(digits)
    }
} 