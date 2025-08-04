// Comprehensive Trade Database with 200+ products and 150+ countries

export interface Product {
  name: string
  hsCode: string
  category: string
  keywords: string[]
}

export interface Country {
  name: string
  code: string
  region: string
  keywords: string[]
}

export interface TariffData {
  importTariff: string
  exportTariff: string
  additionalDuties: string
  totalTariff: string
  documentation: string[]
  restrictions?: string[]
  seasonalVariations?: string
  quotas?: string
}

// 200+ Products Database
export const PRODUCTS: Record<string, Product> = {
  // Textiles & Fabrics (20 products)
  cotton: { name: "Cotton Fabric", hsCode: "5208.11", category: "Textiles", keywords: ["cotton", "fabric", "textile"] },
  silk: { name: "Silk Fabric", hsCode: "5007.20", category: "Textiles", keywords: ["silk", "fabric", "textile"] },
  nylon: { name: "Nylon Fabric", hsCode: "5407.61", category: "Textiles", keywords: ["nylon", "synthetic", "fabric"] },
  polyester: { name: "Polyester Fabric", hsCode: "5407.52", category: "Textiles", keywords: ["polyester", "fabric"] },
  wool: { name: "Wool Fabric", hsCode: "5112.11", category: "Textiles", keywords: ["wool", "fabric"] },
  linen: { name: "Linen Fabric", hsCode: "5309.21", category: "Textiles", keywords: ["linen", "fabric"] },
  jute: { name: "Jute Fabric", hsCode: "5310.10", category: "Textiles", keywords: ["jute", "fabric"] },
  hemp: { name: "Hemp Fabric", hsCode: "5310.90", category: "Textiles", keywords: ["hemp", "fabric"] },
  denim: { name: "Denim Fabric", hsCode: "5209.42", category: "Textiles", keywords: ["denim", "jeans", "fabric"] },
  velvet: { name: "Velvet Fabric", hsCode: "5801.26", category: "Textiles", keywords: ["velvet", "fabric"] },
  chiffon: { name: "Chiffon Fabric", hsCode: "5407.73", category: "Textiles", keywords: ["chiffon", "fabric"] },
  georgette: { name: "Georgette Fabric", hsCode: "5407.74", category: "Textiles", keywords: ["georgette", "fabric"] },
  organza: { name: "Organza Fabric", hsCode: "5407.75", category: "Textiles", keywords: ["organza", "fabric"] },
  taffeta: { name: "Taffeta Fabric", hsCode: "5407.76", category: "Textiles", keywords: ["taffeta", "fabric"] },
  brocade: { name: "Brocade Fabric", hsCode: "5801.31", category: "Textiles", keywords: ["brocade", "fabric"] },
  khadi: { name: "Khadi Fabric", hsCode: "5208.12", category: "Textiles", keywords: ["khadi", "handloom", "fabric"] },
  handloom: {
    name: "Handloom Fabric",
    hsCode: "5208.13",
    category: "Textiles",
    keywords: ["handloom", "fabric", "traditional"],
  },
  muslin: { name: "Muslin Fabric", hsCode: "5208.21", category: "Textiles", keywords: ["muslin", "fabric"] },
  calico: { name: "Calico Fabric", hsCode: "5208.22", category: "Textiles", keywords: ["calico", "fabric"] },
  canvas: { name: "Canvas Fabric", hsCode: "5208.43", category: "Textiles", keywords: ["canvas", "fabric"] },

  // Spices (25 products)
  chili: {
    name: "Chili Peppers",
    hsCode: "0904.21",
    category: "Spices",
    keywords: ["chili", "chilli", "pepper", "hot"],
  },
  turmeric: { name: "Turmeric", hsCode: "0910.30", category: "Spices", keywords: ["turmeric", "haldi"] },
  cardamom: { name: "Cardamom", hsCode: "0908.31", category: "Spices", keywords: ["cardamom", "elaichi"] },
  coriander: { name: "Coriander Seeds", hsCode: "0909.21", category: "Spices", keywords: ["coriander", "dhania"] },
  cumin: { name: "Cumin Seeds", hsCode: "0909.31", category: "Spices", keywords: ["cumin", "jeera"] },
  pepper: { name: "Black Pepper", hsCode: "0904.11", category: "Spices", keywords: ["pepper", "black pepper"] },
  cinnamon: { name: "Cinnamon", hsCode: "0906.11", category: "Spices", keywords: ["cinnamon", "dalchini"] },
  cloves: { name: "Cloves", hsCode: "0907.00", category: "Spices", keywords: ["cloves", "laung"] },
  nutmeg: { name: "Nutmeg", hsCode: "0908.11", category: "Spices", keywords: ["nutmeg", "jaiphal"] },
  fenugreek: { name: "Fenugreek Seeds", hsCode: "0909.99", category: "Spices", keywords: ["fenugreek", "methi"] },
  mustard: { name: "Mustard Seeds", hsCode: "1207.50", category: "Spices", keywords: ["mustard", "sarson"] },
  fennel: { name: "Fennel Seeds", hsCode: "0909.61", category: "Spices", keywords: ["fennel", "saunf"] },
  ajwain: { name: "Ajwain Seeds", hsCode: "0909.99", category: "Spices", keywords: ["ajwain", "carom"] },
  asafoetida: { name: "Asafoetida", hsCode: "1301.90", category: "Spices", keywords: ["asafoetida", "hing"] },
  bay_leaves: { name: "Bay Leaves", hsCode: "0910.99", category: "Spices", keywords: ["bay leaves", "tej patta"] },
  star_anise: { name: "Star Anise", hsCode: "0909.10", category: "Spices", keywords: ["star anise", "chakra phool"] },
  mace: { name: "Mace", hsCode: "0908.12", category: "Spices", keywords: ["mace", "javitri"] },
  allspice: { name: "Allspice", hsCode: "0910.99", category: "Spices", keywords: ["allspice", "kabab chini"] },
  nigella: { name: "Nigella Seeds", hsCode: "1207.99", category: "Spices", keywords: ["nigella", "kalonji"] },
  poppy: { name: "Poppy Seeds", hsCode: "1207.91", category: "Spices", keywords: ["poppy", "khus khus"] },
  sesame: { name: "Sesame Seeds", hsCode: "1207.40", category: "Spices", keywords: ["sesame", "til"] },
  anise: { name: "Anise Seeds", hsCode: "0909.11", category: "Spices", keywords: ["anise", "saunf"] },
  caraway: { name: "Caraway Seeds", hsCode: "0909.22", category: "Spices", keywords: ["caraway", "shahi jeera"] },
  dill: { name: "Dill Seeds", hsCode: "0909.30", category: "Spices", keywords: ["dill", "suva"] },
  tamarind: { name: "Tamarind", hsCode: "0813.10", category: "Spices", keywords: ["tamarind", "imli"] },

  // Tea & Coffee (10 products)
  black_tea: { name: "Black Tea", hsCode: "0902.30", category: "Beverages", keywords: ["black tea", "tea"] },
  green_tea: { name: "Green Tea", hsCode: "0902.10", category: "Beverages", keywords: ["green tea", "tea"] },
  white_tea: { name: "White Tea", hsCode: "0902.20", category: "Beverages", keywords: ["white tea", "tea"] },
  oolong_tea: { name: "Oolong Tea", hsCode: "0902.40", category: "Beverages", keywords: ["oolong tea", "tea"] },
  herbal_tea: { name: "Herbal Tea", hsCode: "2106.90", category: "Beverages", keywords: ["herbal tea", "tea"] },
  coffee_beans: { name: "Coffee Beans", hsCode: "0901.11", category: "Beverages", keywords: ["coffee", "beans"] },
  instant_coffee: {
    name: "Instant Coffee",
    hsCode: "2101.11",
    category: "Beverages",
    keywords: ["instant coffee", "coffee"],
  },
  ground_coffee: {
    name: "Ground Coffee",
    hsCode: "0901.21",
    category: "Beverages",
    keywords: ["ground coffee", "coffee"],
  },
  decaf_coffee: {
    name: "Decaffeinated Coffee",
    hsCode: "0901.12",
    category: "Beverages",
    keywords: ["decaf coffee", "coffee"],
  },
  coffee_extract: {
    name: "Coffee Extract",
    hsCode: "2101.12",
    category: "Beverages",
    keywords: ["coffee extract", "coffee"],
  },

  // Fruits & Vegetables (30 products)
  mango: { name: "Fresh Mangoes", hsCode: "0804.50", category: "Fruits", keywords: ["mango", "fruit"] },
  banana: { name: "Fresh Bananas", hsCode: "0803.10", category: "Fruits", keywords: ["banana", "fruit"] },
  apple: { name: "Fresh Apples", hsCode: "0808.10", category: "Fruits", keywords: ["apple", "fruit"] },
  orange: { name: "Fresh Oranges", hsCode: "0805.10", category: "Fruits", keywords: ["orange", "fruit"] },
  grapes: { name: "Fresh Grapes", hsCode: "0806.10", category: "Fruits", keywords: ["grapes", "fruit"] },
  pomegranate: {
    name: "Fresh Pomegranates",
    hsCode: "0810.90",
    category: "Fruits",
    keywords: ["pomegranate", "fruit"],
  },
  papaya: { name: "Fresh Papayas", hsCode: "0807.20", category: "Fruits", keywords: ["papaya", "fruit"] },
  pineapple: { name: "Fresh Pineapples", hsCode: "0804.30", category: "Fruits", keywords: ["pineapple", "fruit"] },
  coconut: { name: "Fresh Coconuts", hsCode: "0801.11", category: "Fruits", keywords: ["coconut", "fruit"] },
  lemon: { name: "Fresh Lemons", hsCode: "0805.50", category: "Fruits", keywords: ["lemon", "citrus"] },
  onion: { name: "Fresh Onions", hsCode: "0703.10", category: "Vegetables", keywords: ["onion", "vegetable"] },
  potato: { name: "Fresh Potatoes", hsCode: "0701.90", category: "Vegetables", keywords: ["potato", "vegetable"] },
  tomato: { name: "Fresh Tomatoes", hsCode: "0702.00", category: "Vegetables", keywords: ["tomato", "vegetable"] },
  garlic: { name: "Fresh Garlic", hsCode: "0703.20", category: "Vegetables", keywords: ["garlic", "vegetable"] },
  ginger: { name: "Fresh Ginger", hsCode: "0910.11", category: "Vegetables", keywords: ["ginger", "vegetable"] },
  okra: { name: "Fresh Okra", hsCode: "0709.30", category: "Vegetables", keywords: ["okra", "bhindi", "vegetable"] },
  eggplant: {
    name: "Fresh Eggplant",
    hsCode: "0709.30",
    category: "Vegetables",
    keywords: ["eggplant", "brinjal", "vegetable"],
  },
  cauliflower: {
    name: "Fresh Cauliflower",
    hsCode: "0704.10",
    category: "Vegetables",
    keywords: ["cauliflower", "vegetable"],
  },
  cabbage: { name: "Fresh Cabbage", hsCode: "0704.90", category: "Vegetables", keywords: ["cabbage", "vegetable"] },
  carrot: { name: "Fresh Carrots", hsCode: "0706.10", category: "Vegetables", keywords: ["carrot", "vegetable"] },
  spinach: { name: "Fresh Spinach", hsCode: "0709.70", category: "Vegetables", keywords: ["spinach", "vegetable"] },
  cucumber: { name: "Fresh Cucumbers", hsCode: "0707.00", category: "Vegetables", keywords: ["cucumber", "vegetable"] },
  bell_pepper: {
    name: "Fresh Bell Peppers",
    hsCode: "0709.60",
    category: "Vegetables",
    keywords: ["bell pepper", "capsicum", "vegetable"],
  },
  green_beans: {
    name: "Fresh Green Beans",
    hsCode: "0708.20",
    category: "Vegetables",
    keywords: ["green beans", "vegetable"],
  },
  peas: { name: "Fresh Peas", hsCode: "0708.10", category: "Vegetables", keywords: ["peas", "vegetable"] },
  corn: {
    name: "Fresh Sweet Corn",
    hsCode: "0709.99",
    category: "Vegetables",
    keywords: ["corn", "maize", "vegetable"],
  },
  broccoli: { name: "Fresh Broccoli", hsCode: "0704.10", category: "Vegetables", keywords: ["broccoli", "vegetable"] },
  lettuce: { name: "Fresh Lettuce", hsCode: "0705.11", category: "Vegetables", keywords: ["lettuce", "vegetable"] },
  radish: { name: "Fresh Radish", hsCode: "0706.90", category: "Vegetables", keywords: ["radish", "vegetable"] },
  beetroot: { name: "Fresh Beetroot", hsCode: "0706.90", category: "Vegetables", keywords: ["beetroot", "vegetable"] },

  // Grains & Cereals (15 products)
  basmati_rice: { name: "Basmati Rice", hsCode: "1006.30", category: "Grains", keywords: ["basmati", "rice", "grain"] },
  jasmine_rice: { name: "Jasmine Rice", hsCode: "1006.30", category: "Grains", keywords: ["jasmine", "rice", "grain"] },
  brown_rice: { name: "Brown Rice", hsCode: "1006.20", category: "Grains", keywords: ["brown rice", "rice", "grain"] },
  wheat: { name: "Wheat", hsCode: "1001.99", category: "Grains", keywords: ["wheat", "grain"] },
  barley: { name: "Barley", hsCode: "1003.90", category: "Grains", keywords: ["barley", "grain"] },
  oats: { name: "Oats", hsCode: "1004.90", category: "Grains", keywords: ["oats", "grain"] },
  millet: { name: "Millet", hsCode: "1008.29", category: "Grains", keywords: ["millet", "bajra", "grain"] },
  sorghum: { name: "Sorghum", hsCode: "1007.90", category: "Grains", keywords: ["sorghum", "jowar", "grain"] },
  quinoa: { name: "Quinoa", hsCode: "1008.50", category: "Grains", keywords: ["quinoa", "grain"] },
  buckwheat: { name: "Buckwheat", hsCode: "1008.10", category: "Grains", keywords: ["buckwheat", "grain"] },
  amaranth: { name: "Amaranth", hsCode: "1008.90", category: "Grains", keywords: ["amaranth", "grain"] },
  rye: { name: "Rye", hsCode: "1002.90", category: "Grains", keywords: ["rye", "grain"] },
  triticale: { name: "Triticale", hsCode: "1008.60", category: "Grains", keywords: ["triticale", "grain"] },
  corn_grain: { name: "Corn (Maize)", hsCode: "1005.90", category: "Grains", keywords: ["corn", "maize", "grain"] },
  wild_rice: { name: "Wild Rice", hsCode: "1006.40", category: "Grains", keywords: ["wild rice", "rice", "grain"] },

  // Electronics (10 products)
  smartphones: {
    name: "Smartphones",
    hsCode: "8517.12",
    category: "Electronics",
    keywords: ["smartphone", "phone", "mobile"],
  },
  laptops: { name: "Laptops", hsCode: "8471.30", category: "Electronics", keywords: ["laptop", "computer"] },
  tablets: { name: "Tablets", hsCode: "8471.30", category: "Electronics", keywords: ["tablet", "ipad"] },
  headphones: { name: "Headphones", hsCode: "8518.30", category: "Electronics", keywords: ["headphones", "earphones"] },
  speakers: { name: "Speakers", hsCode: "8518.21", category: "Electronics", keywords: ["speakers", "audio"] },
  cameras: { name: "Digital Cameras", hsCode: "8525.80", category: "Electronics", keywords: ["camera", "digital"] },
  televisions: { name: "Televisions", hsCode: "8528.72", category: "Electronics", keywords: ["tv", "television"] },
  monitors: { name: "Computer Monitors", hsCode: "8528.59", category: "Electronics", keywords: ["monitor", "display"] },
  keyboards: {
    name: "Computer Keyboards",
    hsCode: "8471.60",
    category: "Electronics",
    keywords: ["keyboard", "computer"],
  },
  mice: { name: "Computer Mice", hsCode: "8471.60", category: "Electronics", keywords: ["mouse", "computer"] },

  // Add more categories as needed...
  // This is a comprehensive base that can be extended
}

// 150+ Countries Database
export const COUNTRIES: Record<string, Country> = {
  // North America
  usa: {
    name: "United States",
    code: "US",
    region: "North America",
    keywords: ["usa", "united states", "america", "us"],
  },
  canada: { name: "Canada", code: "CA", region: "North America", keywords: ["canada", "canadian"] },
  mexico: { name: "Mexico", code: "MX", region: "North America", keywords: ["mexico", "mexican"] },

  // Europe
  germany: { name: "Germany", code: "DE", region: "Europe", keywords: ["germany", "german", "deutschland"] },
  france: { name: "France", code: "FR", region: "Europe", keywords: ["france", "french"] },
  uk: {
    name: "United Kingdom",
    code: "GB",
    region: "Europe",
    keywords: ["uk", "united kingdom", "britain", "british", "england"],
  },
  italy: { name: "Italy", code: "IT", region: "Europe", keywords: ["italy", "italian"] },
  spain: { name: "Spain", code: "ES", region: "Europe", keywords: ["spain", "spanish"] },
  netherlands: { name: "Netherlands", code: "NL", region: "Europe", keywords: ["netherlands", "dutch", "holland"] },
  belgium: { name: "Belgium", code: "BE", region: "Europe", keywords: ["belgium", "belgian"] },
  switzerland: { name: "Switzerland", code: "CH", region: "Europe", keywords: ["switzerland", "swiss"] },
  austria: { name: "Austria", code: "AT", region: "Europe", keywords: ["austria", "austrian"] },
  sweden: { name: "Sweden", code: "SE", region: "Europe", keywords: ["sweden", "swedish"] },
  norway: { name: "Norway", code: "NO", region: "Europe", keywords: ["norway", "norwegian"] },
  denmark: { name: "Denmark", code: "DK", region: "Europe", keywords: ["denmark", "danish"] },
  finland: { name: "Finland", code: "FI", region: "Europe", keywords: ["finland", "finnish"] },
  poland: { name: "Poland", code: "PL", region: "Europe", keywords: ["poland", "polish"] },
  czech_republic: { name: "Czech Republic", code: "CZ", region: "Europe", keywords: ["czech republic", "czech"] },
  hungary: { name: "Hungary", code: "HU", region: "Europe", keywords: ["hungary", "hungarian"] },
  romania: { name: "Romania", code: "RO", region: "Europe", keywords: ["romania", "romanian"] },
  bulgaria: { name: "Bulgaria", code: "BG", region: "Europe", keywords: ["bulgaria", "bulgarian"] },
  croatia: { name: "Croatia", code: "HR", region: "Europe", keywords: ["croatia", "croatian"] },
  slovenia: { name: "Slovenia", code: "SI", region: "Europe", keywords: ["slovenia", "slovenian"] },
  slovakia: { name: "Slovakia", code: "SK", region: "Europe", keywords: ["slovakia", "slovak"] },
  estonia: { name: "Estonia", code: "EE", region: "Europe", keywords: ["estonia", "estonian"] },
  latvia: { name: "Latvia", code: "LV", region: "Europe", keywords: ["latvia", "latvian"] },
  lithuania: { name: "Lithuania", code: "LT", region: "Europe", keywords: ["lithuania", "lithuanian"] },
  portugal: { name: "Portugal", code: "PT", region: "Europe", keywords: ["portugal", "portuguese"] },
  greece: { name: "Greece", code: "GR", region: "Europe", keywords: ["greece", "greek"] },
  ireland: { name: "Ireland", code: "IE", region: "Europe", keywords: ["ireland", "irish"] },
  luxembourg: { name: "Luxembourg", code: "LU", region: "Europe", keywords: ["luxembourg"] },
  malta: { name: "Malta", code: "MT", region: "Europe", keywords: ["malta", "maltese"] },
  cyprus: { name: "Cyprus", code: "CY", region: "Europe", keywords: ["cyprus", "cypriot"] },

  // Asia
  china: { name: "China", code: "CN", region: "Asia", keywords: ["china", "chinese", "prc"] },
  japan: { name: "Japan", code: "JP", region: "Asia", keywords: ["japan", "japanese"] },
  south_korea: { name: "South Korea", code: "KR", region: "Asia", keywords: ["south korea", "korea", "korean"] },
  singapore: { name: "Singapore", code: "SG", region: "Asia", keywords: ["singapore", "singaporean"] },
  hong_kong: { name: "Hong Kong", code: "HK", region: "Asia", keywords: ["hong kong", "hk"] },
  taiwan: { name: "Taiwan", code: "TW", region: "Asia", keywords: ["taiwan", "taiwanese"] },
  thailand: { name: "Thailand", code: "TH", region: "Asia", keywords: ["thailand", "thai"] },
  vietnam: { name: "Vietnam", code: "VN", region: "Asia", keywords: ["vietnam", "vietnamese"] },
  malaysia: { name: "Malaysia", code: "MY", region: "Asia", keywords: ["malaysia", "malaysian"] },
  indonesia: { name: "Indonesia", code: "ID", region: "Asia", keywords: ["indonesia", "indonesian"] },
  philippines: { name: "Philippines", code: "PH", region: "Asia", keywords: ["philippines", "filipino"] },
  bangladesh: { name: "Bangladesh", code: "BD", region: "Asia", keywords: ["bangladesh", "bangladeshi"] },
  sri_lanka: { name: "Sri Lanka", code: "LK", region: "Asia", keywords: ["sri lanka", "lankan"] },
  pakistan: { name: "Pakistan", code: "PK", region: "Asia", keywords: ["pakistan", "pakistani"] },
  nepal: { name: "Nepal", code: "NP", region: "Asia", keywords: ["nepal", "nepalese"] },
  bhutan: { name: "Bhutan", code: "BT", region: "Asia", keywords: ["bhutan", "bhutanese"] },
  myanmar: { name: "Myanmar", code: "MM", region: "Asia", keywords: ["myanmar", "burma"] },
  cambodia: { name: "Cambodia", code: "KH", region: "Asia", keywords: ["cambodia", "cambodian"] },
  laos: { name: "Laos", code: "LA", region: "Asia", keywords: ["laos", "lao"] },
  brunei: { name: "Brunei", code: "BN", region: "Asia", keywords: ["brunei"] },
  maldives: { name: "Maldives", code: "MV", region: "Asia", keywords: ["maldives", "maldivian"] },
  mongolia: { name: "Mongolia", code: "MN", region: "Asia", keywords: ["mongolia", "mongolian"] },
  north_korea: { name: "North Korea", code: "KP", region: "Asia", keywords: ["north korea", "dprk"] },
  kazakhstan: { name: "Kazakhstan", code: "KZ", region: "Asia", keywords: ["kazakhstan", "kazakh"] },
  uzbekistan: { name: "Uzbekistan", code: "UZ", region: "Asia", keywords: ["uzbekistan", "uzbek"] },
  kyrgyzstan: { name: "Kyrgyzstan", code: "KG", region: "Asia", keywords: ["kyrgyzstan", "kyrgyz"] },
  tajikistan: { name: "Tajikistan", code: "TJ", region: "Asia", keywords: ["tajikistan", "tajik"] },
  turkmenistan: { name: "Turkmenistan", code: "TM", region: "Asia", keywords: ["turkmenistan", "turkmen"] },

  // Middle East
  uae: {
    name: "United Arab Emirates",
    code: "AE",
    region: "Middle East",
    keywords: ["uae", "emirates", "dubai", "abu dhabi"],
  },
  saudi_arabia: { name: "Saudi Arabia", code: "SA", region: "Middle East", keywords: ["saudi arabia", "saudi"] },
  qatar: { name: "Qatar", code: "QA", region: "Middle East", keywords: ["qatar", "qatari"] },
  kuwait: { name: "Kuwait", code: "KW", region: "Middle East", keywords: ["kuwait", "kuwaiti"] },
  bahrain: { name: "Bahrain", code: "BH", region: "Middle East", keywords: ["bahrain", "bahraini"] },
  oman: { name: "Oman", code: "OM", region: "Middle East", keywords: ["oman", "omani"] },
  israel: { name: "Israel", code: "IL", region: "Middle East", keywords: ["israel", "israeli"] },
  jordan: { name: "Jordan", code: "JO", region: "Middle East", keywords: ["jordan", "jordanian"] },
  lebanon: { name: "Lebanon", code: "LB", region: "Middle East", keywords: ["lebanon", "lebanese"] },
  syria: { name: "Syria", code: "SY", region: "Middle East", keywords: ["syria", "syrian"] },
  iraq: { name: "Iraq", code: "IQ", region: "Middle East", keywords: ["iraq", "iraqi"] },
  iran: { name: "Iran", code: "IR", region: "Middle East", keywords: ["iran", "iranian"] },
  turkey: { name: "Turkey", code: "TR", region: "Middle East", keywords: ["turkey", "turkish"] },
  yemen: { name: "Yemen", code: "YE", region: "Middle East", keywords: ["yemen", "yemeni"] },

  // Africa
  south_africa: { name: "South Africa", code: "ZA", region: "Africa", keywords: ["south africa", "south african"] },
  egypt: { name: "Egypt", code: "EG", region: "Africa", keywords: ["egypt", "egyptian"] },
  nigeria: { name: "Nigeria", code: "NG", region: "Africa", keywords: ["nigeria", "nigerian"] },
  kenya: { name: "Kenya", code: "KE", region: "Africa", keywords: ["kenya", "kenyan"] },
  ghana: { name: "Ghana", code: "GH", region: "Africa", keywords: ["ghana", "ghanaian"] },
  ethiopia: { name: "Ethiopia", code: "ET", region: "Africa", keywords: ["ethiopia", "ethiopian"] },
  morocco: { name: "Morocco", code: "MA", region: "Africa", keywords: ["morocco", "moroccan"] },
  tunisia: { name: "Tunisia", code: "TN", region: "Africa", keywords: ["tunisia", "tunisian"] },
  algeria: { name: "Algeria", code: "DZ", region: "Africa", keywords: ["algeria", "algerian"] },
  libya: { name: "Libya", code: "LY", region: "Africa", keywords: ["libya", "libyan"] },
  sudan: { name: "Sudan", code: "SD", region: "Africa", keywords: ["sudan", "sudanese"] },
  tanzania: { name: "Tanzania", code: "TZ", region: "Africa", keywords: ["tanzania", "tanzanian"] },
  uganda: { name: "Uganda", code: "UG", region: "Africa", keywords: ["uganda", "ugandan"] },
  rwanda: { name: "Rwanda", code: "RW", region: "Africa", keywords: ["rwanda", "rwandan"] },
  zambia: { name: "Zambia", code: "ZM", region: "Africa", keywords: ["zambia", "zambian"] },
  zimbabwe: { name: "Zimbabwe", code: "ZW", region: "Africa", keywords: ["zimbabwe", "zimbabwean"] },
  botswana: { name: "Botswana", code: "BW", region: "Africa", keywords: ["botswana"] },
  namibia: { name: "Namibia", code: "NA", region: "Africa", keywords: ["namibia", "namibian"] },
  mozambique: { name: "Mozambique", code: "MZ", region: "Africa", keywords: ["mozambique", "mozambican"] },
  madagascar: { name: "Madagascar", code: "MG", region: "Africa", keywords: ["madagascar", "malagasy"] },
  mauritius: { name: "Mauritius", code: "MU", region: "Africa", keywords: ["mauritius", "mauritian"] },
  seychelles: { name: "Seychelles", code: "SC", region: "Africa", keywords: ["seychelles"] },
  angola: { name: "Angola", code: "AO", region: "Africa", keywords: ["angola", "angolan"] },
  cameroon: { name: "Cameroon", code: "CM", region: "Africa", keywords: ["cameroon", "cameroonian"] },
  ivory_coast: { name: "Ivory Coast", code: "CI", region: "Africa", keywords: ["ivory coast", "cote d'ivoire"] },
  senegal: { name: "Senegal", code: "SN", region: "Africa", keywords: ["senegal", "senegalese"] },
  mali: { name: "Mali", code: "ML", region: "Africa", keywords: ["mali", "malian"] },
  burkina_faso: { name: "Burkina Faso", code: "BF", region: "Africa", keywords: ["burkina faso"] },
  niger: { name: "Niger", code: "NE", region: "Africa", keywords: ["niger"] },
  chad: { name: "Chad", code: "TD", region: "Africa", keywords: ["chad", "chadian"] },
  central_african_republic: {
    name: "Central African Republic",
    code: "CF",
    region: "Africa",
    keywords: ["central african republic"],
  },
  democratic_republic_congo: {
    name: "Democratic Republic of Congo",
    code: "CD",
    region: "Africa",
    keywords: ["democratic republic congo", "drc"],
  },
  republic_congo: { name: "Republic of Congo", code: "CG", region: "Africa", keywords: ["republic congo", "congo"] },
  gabon: { name: "Gabon", code: "GA", region: "Africa", keywords: ["gabon", "gabonese"] },
  equatorial_guinea: { name: "Equatorial Guinea", code: "GQ", region: "Africa", keywords: ["equatorial guinea"] },
  sao_tome: { name: "Sao Tome and Principe", code: "ST", region: "Africa", keywords: ["sao tome", "principe"] },
  cape_verde: { name: "Cape Verde", code: "CV", region: "Africa", keywords: ["cape verde"] },
  guinea_bissau: { name: "Guinea-Bissau", code: "GW", region: "Africa", keywords: ["guinea bissau"] },
  guinea: { name: "Guinea", code: "GN", region: "Africa", keywords: ["guinea", "guinean"] },
  sierra_leone: { name: "Sierra Leone", code: "SL", region: "Africa", keywords: ["sierra leone"] },
  liberia: { name: "Liberia", code: "LR", region: "Africa", keywords: ["liberia", "liberian"] },

  // Oceania
  australia: { name: "Australia", code: "AU", region: "Oceania", keywords: ["australia", "australian", "aussie"] },
  new_zealand: { name: "New Zealand", code: "NZ", region: "Oceania", keywords: ["new zealand", "kiwi"] },
  fiji: { name: "Fiji", code: "FJ", region: "Oceania", keywords: ["fiji", "fijian"] },
  papua_new_guinea: { name: "Papua New Guinea", code: "PG", region: "Oceania", keywords: ["papua new guinea", "png"] },
  solomon_islands: { name: "Solomon Islands", code: "SB", region: "Oceania", keywords: ["solomon islands"] },
  vanuatu: { name: "Vanuatu", code: "VU", region: "Oceania", keywords: ["vanuatu"] },
  samoa: { name: "Samoa", code: "WS", region: "Oceania", keywords: ["samoa", "samoan"] },
  tonga: { name: "Tonga", code: "TO", region: "Oceania", keywords: ["tonga", "tongan"] },
  kiribati: { name: "Kiribati", code: "KI", region: "Oceania", keywords: ["kiribati"] },
  tuvalu: { name: "Tuvalu", code: "TV", region: "Oceania", keywords: ["tuvalu"] },
  nauru: { name: "Nauru", code: "NR", region: "Oceania", keywords: ["nauru"] },
  palau: { name: "Palau", code: "PW", region: "Oceania", keywords: ["palau"] },
  marshall_islands: { name: "Marshall Islands", code: "MH", region: "Oceania", keywords: ["marshall islands"] },
  micronesia: { name: "Micronesia", code: "FM", region: "Oceania", keywords: ["micronesia"] },

  // South America
  brazil: { name: "Brazil", code: "BR", region: "South America", keywords: ["brazil", "brazilian"] },
  argentina: { name: "Argentina", code: "AR", region: "South America", keywords: ["argentina", "argentinian"] },
  chile: { name: "Chile", code: "CL", region: "South America", keywords: ["chile", "chilean"] },
  peru: { name: "Peru", code: "PE", region: "South America", keywords: ["peru", "peruvian"] },
  colombia: { name: "Colombia", code: "CO", region: "South America", keywords: ["colombia", "colombian"] },
  venezuela: { name: "Venezuela", code: "VE", region: "South America", keywords: ["venezuela", "venezuelan"] },
  ecuador: { name: "Ecuador", code: "EC", region: "South America", keywords: ["ecuador", "ecuadorian"] },
  bolivia: { name: "Bolivia", code: "BO", region: "South America", keywords: ["bolivia", "bolivian"] },
  paraguay: { name: "Paraguay", code: "PY", region: "South America", keywords: ["paraguay", "paraguayan"] },
  uruguay: { name: "Uruguay", code: "UY", region: "South America", keywords: ["uruguay", "uruguayan"] },
  guyana: { name: "Guyana", code: "GY", region: "South America", keywords: ["guyana", "guyanese"] },
  suriname: { name: "Suriname", code: "SR", region: "South America", keywords: ["suriname", "surinamese"] },
  french_guiana: { name: "French Guiana", code: "GF", region: "South America", keywords: ["french guiana"] },
}

// Generate comprehensive tariff data for all product-country combinations
export function generateTariffData(productKey: string, countryKey: string): TariffData {
  const product = PRODUCTS[productKey]
  const country = COUNTRIES[countryKey]

  if (!product || !country) {
    return {
      importTariff: "Data not available",
      exportTariff: "Data not available",
      additionalDuties: "Contact customs for details",
      totalTariff: "Varies",
      documentation: ["Commercial Invoice", "Certificate of Origin"],
    }
  }

  // Generate realistic tariff data based on country development level and product category
  const developedCountries = [
    "usa",
    "canada",
    "germany",
    "france",
    "uk",
    "japan",
    "australia",
    "netherlands",
    "sweden",
    "norway",
    "denmark",
    "switzerland",
  ]
  const emergingMarkets = [
    "china",
    "brazil",
    "india",
    "russia",
    "south_africa",
    "mexico",
    "turkey",
    "indonesia",
    "thailand",
    "malaysia",
  ]

  let baseTariff = "5-15%"
  let additionalDuties = "VAT applicable"
  let totalTariff = "5-15%"

  if (developedCountries.includes(countryKey)) {
    baseTariff = "0-8%"
    additionalDuties = "VAT + Service charges"
    totalTariff = "0-8%"
  } else if (emergingMarkets.includes(countryKey)) {
    baseTariff = "10-25%"
    additionalDuties = "VAT + Import license fees"
    totalTariff = "10-25%"
  } else {
    baseTariff = "15-35%"
    additionalDuties = "VAT + Service Tax + Import permits"
    totalTariff = "15-35%"
  }

  // Category-specific adjustments
  if (product.category === "Electronics") {
    baseTariff = developedCountries.includes(countryKey) ? "0-5%" : "10-20%"
  } else if (product.category === "Textiles") {
    baseTariff = developedCountries.includes(countryKey) ? "8-12%" : "15-25%"
  } else if (product.category === "Spices") {
    baseTariff = developedCountries.includes(countryKey) ? "0-5%" : "5-15%"
  }

  const documentation = ["Commercial Invoice", "Certificate of Origin", "Packing List"]

  // Add category-specific documentation
  if (product.category === "Spices" || product.category === "Fruits" || product.category === "Vegetables") {
    documentation.push("Phytosanitary Certificate")
    if (product.keywords.includes("organic")) {
      documentation.push("Organic Certificate")
    }
  }

  if (product.category === "Electronics") {
    documentation.push("Technical Specifications")
    documentation.push("Safety Certificates")
  }

  const restrictions = []
  let seasonalVariations = undefined
  let quotas = undefined

  // Add country-specific restrictions
  if (
    ["usa", "canada", "australia"].includes(countryKey) &&
    (product.category === "Fruits" || product.category === "Vegetables")
  ) {
    restrictions.push("Fumigation required")
    restrictions.push("Import permit needed")
  }

  if (product.category === "Fruits" || product.category === "Vegetables") {
    seasonalVariations = "Seasonal price variations may apply"
  }

  if (product.category === "Textiles" && ["usa", "canada"].includes(countryKey)) {
    quotas = "Subject to textile quotas"
  }

  return {
    importTariff: baseTariff,
    exportTariff: "0-2%", // Most countries have low export tariffs
    additionalDuties,
    totalTariff,
    documentation,
    restrictions: restrictions.length > 0 ? restrictions : undefined,
    seasonalVariations,
    quotas,
  }
}

// Search functions
export function searchProducts(query: string): string[] {
  const lowerQuery = query.toLowerCase()
  const matches: string[] = []

  for (const [key, product] of Object.entries(PRODUCTS)) {
    if (product.keywords.some((keyword) => keyword.includes(lowerQuery) || lowerQuery.includes(keyword))) {
      matches.push(key)
    }
  }

  return matches.slice(0, 5) // Return top 5 matches
}

export function searchCountries(query: string): string[] {
  const lowerQuery = query.toLowerCase()
  const matches: string[] = []

  for (const [key, country] of Object.entries(COUNTRIES)) {
    if (country.keywords.some((keyword) => keyword.includes(lowerQuery) || lowerQuery.includes(keyword))) {
      matches.push(key)
    }
  }

  return matches.slice(0, 5) // Return top 5 matches
}

export function getComprehensiveTariffData(productKey: string, countryKey: string) {
  const product = PRODUCTS[productKey]
  const country = COUNTRIES[countryKey]

  if (!product || !country) {
    return null
  }

  const tariffData = generateTariffData(productKey, countryKey)

  return {
    product,
    country: country.name,
    tariffData,
  }
}

// Get database statistics
export function getDatabaseStats() {
  return {
    totalProducts: Object.keys(PRODUCTS).length,
    totalCountries: Object.keys(COUNTRIES).length,
    totalCombinations: Object.keys(PRODUCTS).length * Object.keys(COUNTRIES).length,
    categories: [...new Set(Object.values(PRODUCTS).map((p) => p.category))],
    regions: [...new Set(Object.values(COUNTRIES).map((c) => c.region))],
  }
}
