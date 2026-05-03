const storagePrefix = "sikho-india";
const activeStudentKey = `${storagePrefix}-active-student`;

const standards = Array.from({ length: 10 }, (_, index) => String(index + 1));

const languages = [
  ["en-IN", "English"],
  ["hi-IN", "Hindi"],
  ["bn-IN", "Bengali"],
  ["te-IN", "Telugu"],
  ["mr-IN", "Marathi"],
  ["ta-IN", "Tamil"],
  ["ur-IN", "Urdu"],
  ["gu-IN", "Gujarati"],
  ["kn-IN", "Kannada"],
  ["ml-IN", "Malayalam"],
  ["or-IN", "Odia"],
  ["pa-IN", "Punjabi"],
  ["as-IN", "Assamese"],
  ["mai-IN", "Maithili"],
  ["sat-IN", "Santali"],
  ["ks-IN", "Kashmiri"],
  ["ne-IN", "Nepali"],
  ["sd-IN", "Sindhi"],
  ["kok-IN", "Konkani"],
  ["doi-IN", "Dogri"],
  ["mni-IN", "Manipuri"],
  ["sa-IN", "Sanskrit"]
];

const languageGuidance = {
  "en-IN": ["This chapter is explained in simple English.", "Use examples from school, home, market, farms, water, maps, festivals, and family life.", "Listen, read, speak the answer, and then try the quiz."],
  "hi-IN": ["यह अध्याय सरल हिंदी में समझाया गया है।", "इसे स्कूल, घर, बाजार, खेत, पानी, नक्शे, त्योहार और परिवार के उदाहरणों से समझें।", "सुनें, पढ़ें, उत्तर बोलें, फिर क्विज़ करें।"],
  "bn-IN": ["এই অধ্যায়টি সহজ বাংলায় বোঝানো হয়েছে।", "স্কুল, বাড়ি, বাজার, ক্ষেত, জল, মানচিত্র, উৎসব ও পরিবারের উদাহরণে বুঝুন।", "শুনুন, পড়ুন, উত্তর বলুন, তারপর কুইজ করুন।"],
  "te-IN": ["ఈ పాఠం సులభమైన తెలుగులో వివరించబడింది.", "పాఠశాల, ఇల్లు, మార్కెట్, పొలం, నీరు, మ్యాప్, పండుగలు, కుటుంబ ఉదాహరణలతో అర్థం చేసుకోండి.", "వినండి, చదవండి, సమాధానం చెప్పండి, తరువాత క్విజ్ చేయండి."],
  "mr-IN": ["हा धडा सोप्या मराठीत समजावला आहे.", "शाळा, घर, बाजार, शेती, पाणी, नकाशे, सण आणि कुटुंबाच्या उदाहरणांनी समजा.", "ऐका, वाचा, उत्तर बोला, मग क्विझ सोडवा."],
  "ta-IN": ["இந்த பாடம் எளிய தமிழில் விளக்கப்படுகிறது.", "பள்ளி, வீடு, சந்தை, வயல், நீர், வரைபடம், திருவிழா, குடும்ப உதாரணங்களால் புரிந்துகொள்ளுங்கள்.", "கேளுங்கள், படியுங்கள், பதிலை சொல்லுங்கள், பிறகு வினாவை செய்யுங்கள்."],
  "ur-IN": ["یہ سبق آسان اردو میں سمجھایا گیا ہے۔", "اسے اسکول، گھر، بازار، کھیت، پانی، نقشہ، تہوار اور خاندان کی مثالوں سے سمجھیں۔", "سنیں، پڑھیں، جواب بولیں، پھر کوئز کریں۔"],
  "gu-IN": ["આ પાઠ સરળ ગુજરાતીમાં સમજાવવામાં આવ્યો છે.", "શાળા, ઘર, બજાર, ખેતર, પાણી, નકશો, તહેવાર અને પરિવારના ઉદાહરણોથી સમજો.", "સાંભળો, વાંચો, જવાબ બોલો, પછી ક્વિઝ કરો."],
  "kn-IN": ["ಈ ಪಾಠವನ್ನು ಸರಳ ಕನ್ನಡದಲ್ಲಿ ವಿವರಿಸಲಾಗಿದೆ.", "ಶಾಲೆ, ಮನೆ, ಮಾರುಕಟ್ಟೆ, ಹೊಲ, ನೀರು, ನಕ್ಷೆ, ಹಬ್ಬ ಮತ್ತು ಕುಟುಂಬದ ಉದಾಹರಣೆಗಳಿಂದ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.", "ಕೇಳಿ, ಓದಿ, ಉತ್ತರ ಹೇಳಿ, ನಂತರ ಕ್ವಿಜ್ ಮಾಡಿ."],
  "ml-IN": ["ഈ പാഠം ലളിതമായ മലയാളത്തിൽ വിശദീകരിച്ചിരിക്കുന്നു.", "സ്കൂൾ, വീട്, ചന്ത, വയൽ, വെള്ളം, ഭൂപടം, ഉത്സവം, കുടുംബം എന്നീ ഉദാഹരണങ്ങളിലൂടെ മനസ്സിലാക്കുക.", "കേൾക്കുക, വായിക്കുക, ഉത്തരം പറയുക, ശേഷം ക്വിസ് ചെയ്യുക."],
  "or-IN": ["ଏହି ପାଠଟି ସରଳ ଓଡ଼ିଆରେ ବୁଝାଯାଇଛି।", "ସ୍କୁଲ, ଘର, ବଜାର, ଖେତ, ପାଣି, ମାନଚିତ୍ର, ପର୍ବ ଓ ପରିବାର ଉଦାହରଣରେ ବୁଝନ୍ତୁ।", "ଶୁଣନ୍ତୁ, ପଢନ୍ତୁ, ଉତ୍ତର କହନ୍ତୁ, ପରେ କ୍ୱିଜ୍ କରନ୍ତୁ।"],
  "pa-IN": ["ਇਹ ਪਾਠ ਸੌਖੀ ਪੰਜਾਬੀ ਵਿੱਚ ਸਮਝਾਇਆ ਗਿਆ ਹੈ।", "ਸਕੂਲ, ਘਰ, ਬਾਜ਼ਾਰ, ਖੇਤ, ਪਾਣੀ, ਨਕਸ਼ੇ, ਤਿਉਹਾਰ ਅਤੇ ਪਰਿਵਾਰ ਦੇ ਉਦਾਹਰਣਾਂ ਨਾਲ ਸਮਝੋ।", "ਸੁਣੋ, ਪੜ੍ਹੋ, ਜਵਾਬ ਬੋਲੋ, ਫਿਰ ਕੁਇਜ਼ ਕਰੋ।"],
  "as-IN": ["এই পাঠটো সহজ অসমীয়াত বুজোৱা হৈছে।", "বিদ্যালয়, ঘৰ, বজাৰ, পথাৰ, পানী, মানচিত্ৰ, উৎসৱ আৰু পৰিয়ালৰ উদাহৰণেৰে বুজক।", "শুনক, পঢ়ক, উত্তৰ কওক, তাৰ পিছত কুইজ কৰক।"],
  "mai-IN": ["ई पाठ सरल मैथिली में बुझाओल गेल अछि।", "स्कूल, घर, बजार, खेत, पानि, नक्शा, पर्व आ परिवारक उदाहरण सँ बुझू।", "सुनू, पढ़ू, उत्तर बाजू, फेर क्विज करू।"],
  "sat-IN": ["ᱱᱚᱶᱟ ᱯᱟᱴ ᱥᱟᱫᱷᱟᱨᱚᱱ ᱥᱟᱱᱛᱟᱲᱤ ᱨᱮ ᱵᱩᱡᱷᱟᱣ ᱟᱠᱟᱱᱟ।", "ᱥᱠᱩᱞ, ᱚᱲᱟᱜ, ᱦᱟᱴ, ᱚᱛ, ᱫᱟᱜ, ᱱᱚᱠᱥᱟ, ᱯᱚᱨᱚᱵ ᱟᱨ ᱯᱟᱨᱤᱵᱟᱨ ᱨᱮᱱᱟᱜ ᱫᱟᱹᱭᱠᱟᱹ ᱥᱟᱶ ᱵᱩᱡᱷᱟᱣ।", "ᱟᱧᱡᱚᱢ, ᱯᱚᱲᱦᱟᱣ, ᱛᱮᱞᱟ ᱢᱮ, ᱛᱟᱨ ᱯᱟᱪᱷᱟᱛ ᱠᱩᱭᱤᱡ।"],
  "ks-IN": ["یہ سبق سادہ کشمیری مدد کے ساتھ سمجھایا گیا ہے۔", "اسے اسکول، گھر، بازار، کھیت، پانی، نقشہ، تہوار اور خاندان کی مثالوں سے سمجھیں۔", "سنیں، پڑھیں، جواب بولیں، پھر کوئز کریں۔"],
  "ne-IN": ["यो पाठ सरल नेपालीमा बुझाइएको छ।", "विद्यालय, घर, बजार, खेत, पानी, नक्सा, चाडपर्व र परिवारका उदाहरणबाट बुझ्नुहोस्।", "सुन्नुहोस्, पढ्नुहोस्, उत्तर बोल्नुहोस्, अनि क्विज गर्नुहोस्।"],
  "sd-IN": ["هي سبق سادي سنڌي ۾ سمجھايو ويو آهي.", "اسڪول، گهر، بازار، کيت، پاڻي، نقشو، ميلو ۽ خاندان جي مثالن سان سمجھو.", "ٻڌو، پڙهو، جواب چئو، پوءِ ڪوز ڪريو."],
  "kok-IN": ["हो धडो सोप्या कोंकणींत समजायलो आसा.", "शाळा, घर, बाजार, शेत, उदक, नकाशो, सण आनी कुटुंबाच्या उदाहरणांनी समजून घेयात.", "आयकात, वाचात, जाप दिवची, मागीर क्विझ करात."],
  "doi-IN": ["एह पाठ सादी डोगरी च समझाया गेआ ऐ।", "स्कूल, घर, बजार, खेत, पानी, नक्शा, त्योहार ते परिवार दे उदाहरणां नाल समझो।", "सुनो, पढ़ो, जवाब बोलो, फिर क्विज करो।"],
  "mni-IN": ["মসিগী পাঠ অসানবা মণিপুরী সাহায্যনা তাক্লি।", "স্কুল, য়ুম, কৈথেল, লৌ, ইশিং, মেপ, উৎসব অমসুং পরিবারগী খুদমশিংদা বুঝিবিয়ু।", "তাবিয়ু, পাবিয়ু, পাউখুম হায়িবিয়ু, অদুগা কুইজ তৌবিয়ু।"],
  "sa-IN": ["अयं पाठः सरलसंस्कृतेन व्याख्यातः।", "विद्यालय, गृहम्, विपणिः, क्षेत्रम्, जलम्, मानचित्रम्, उत्सवः, परिवारः इत्यादि उदाहरणैः अवगच्छतु।", "श्रुणुत, पठत, उत्तरं वदत, ततः प्रश्नोत्तरीं कुरुत।"]
};

const subjects = [
  { key: "mathematics", name: "Mathematics", color: "#0f766e" },
  { key: "science", name: "Science", color: "#3857a6" },
  { key: "social", name: "Social Science", color: "#c85b48" },
  { key: "english", name: "English", color: "#7c3aed" },
  { key: "regional", name: "Regional Language", color: "#d99b2b" }
];

const regionalExplanations = {
  "hi-IN": {
    simple: "यह अध्याय सरल भाषा में समझाया गया है। पहले मुख्य विचार पढ़ें, फिर उदाहरण देखें, और अंत में प्रश्न हल करें।",
    example: "गांव का उदाहरण: इस पाठ को खेत, बाजार, स्कूल, पानी, परिवार या स्थानीय जीवन से जोड़कर समझें।",
    revise: "दोहराई: पाठ सुनें, एक बार पढ़ें, अपनी भाषा में बोलकर समझाएं, फिर क्विज़ हल करें।",
    english: "English reference"
  },
  "ta-IN": {
    simple: "இந்த பாடம் எளிய மொழியில் விளக்கப்படுகிறது. முதலில் கருத்தை படித்து, உதாரணம் பார்த்து, பிறகு வினாவை முயற்சிக்கவும்.",
    example: "கிராம உதாரணம்: இந்த கருத்தை வயல், சந்தை, பள்ளி, நீர், குடும்பம் அல்லது உள்ளூர் வாழ்க்கையுடன் இணைத்து புரிந்துகொள்ளுங்கள்.",
    revise: "மறுபார்வை: பாடத்தை கேளுங்கள், படியுங்கள், உங்கள் மொழியில் விளக்குங்கள், பிறகு வினாவை செய்யுங்கள்.",
    english: "English reference"
  },
  "bn-IN": {
    simple: "এই অধ্যায়টি সহজ ভাষায় বোঝানো হয়েছে। আগে মূল ধারণা পড়ুন, তারপর উদাহরণ দেখুন, শেষে প্রশ্নের উত্তর দিন।",
    example: "গ্রামের উদাহরণ: পাঠটি ক্ষেত, বাজার, স্কুল, জল, পরিবার বা স্থানীয় জীবনের সঙ্গে মিলিয়ে বুঝুন।",
    revise: "পুনরাবৃত্তি: পাঠ শুনুন, পড়ুন, নিজের ভাষায় বলুন, তারপর কুইজ করুন।",
    english: "English reference"
  },
  "te-IN": {
    simple: "ఈ పాఠం సులభమైన భాషలో వివరించబడింది. ముందు భావాన్ని చదవండి, ఉదాహరణ చూడండి, తరువాత ప్రశ్నకు సమాధానం చెప్పండి.",
    example: "గ్రామ ఉదాహరణ: ఈ భావాన్ని పొలం, మార్కెట్, పాఠశాల, నీరు, కుటుంబం లేదా స్థానిక జీవితంతో కలిపి అర్థం చేసుకోండి.",
    revise: "పునశ్చరణ: పాఠాన్ని వినండి, చదవండి, మీ భాషలో చెప్పండి, తరువాత క్విజ్ చేయండి.",
    english: "English reference"
  },
  "mr-IN": {
    simple: "हा धडा सोप्या भाषेत समजावला आहे. आधी मुख्य कल्पना वाचा, मग उदाहरण पाहा, आणि शेवटी प्रश्न सोडवा.",
    example: "गावातील उदाहरण: हा धडा शेती, बाजार, शाळा, पाणी, कुटुंब किंवा स्थानिक जीवनाशी जोडून समजा.",
    revise: "उजळणी: धडा ऐका, वाचा, आपल्या भाषेत समजावून सांगा, मग क्विझ सोडवा.",
    english: "English reference"
  },
  "gu-IN": {
    simple: "આ પાઠ સરળ ભાષામાં સમજાવવામાં આવ્યો છે. પહેલા મુખ્ય વિચાર વાંચો, પછી ઉદાહરણ જુઓ, અને અંતે પ્રશ્નનો જવાબ આપો.",
    example: "ગામનું ઉદાહરણ: આ વિચારને ખેતર, બજાર, શાળા, પાણી, પરિવાર અથવા સ્થાનિક જીવન સાથે જોડીને સમજો.",
    revise: "પુનરાવર્તન: પાઠ સાંભળો, વાંચો, તમારી ભાષામાં સમજાવો, પછી ક્વિઝ કરો.",
    english: "English reference"
  },
  "kn-IN": {
    simple: "ಈ ಪಾಠವನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಲಾಗಿದೆ. ಮೊದಲು ಮುಖ್ಯ ವಿಚಾರ ಓದಿ, ಉದಾಹರಣೆ ನೋಡಿ, ನಂತರ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ.",
    example: "ಗ್ರಾಮದ ಉದಾಹರಣೆ: ಈ ವಿಚಾರವನ್ನು ಹೊಲ, ಮಾರುಕಟ್ಟೆ, ಶಾಲೆ, ನೀರು, ಕುಟುಂಬ ಅಥವಾ ಸ್ಥಳೀಯ ಜೀವನಕ್ಕೆ ಸೇರಿಸಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
    revise: "ಪುನರಾವರ್ತನೆ: ಪಾಠವನ್ನು ಕೇಳಿ, ಓದಿ, ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ ವಿವರಿಸಿ, ನಂತರ ಕ್ವಿಜ್ ಮಾಡಿ.",
    english: "English reference"
  },
  "ml-IN": {
    simple: "ഈ പാഠം ലളിതമായ ഭാഷയിൽ വിശദീകരിച്ചിരിക്കുന്നു. ആദ്യം പ്രധാന ആശയം വായിക്കുക, ഉദാഹരണം കാണുക, പിന്നെ ചോദ്യം ചെയ്യുക.",
    example: "ഗ്രാമ ഉദാഹരണം: ഈ ആശയം വയൽ, ചന്ത, സ്കൂൾ, വെള്ളം, കുടുംബം, പ്രാദേശിക ജീവിതം എന്നിവയുമായി ബന്ധിപ്പിച്ച് മനസ്സിലാക്കുക.",
    revise: "ആവർത്തനം: പാഠം കേൾക്കുക, വായിക്കുക, സ്വന്തം ഭാഷയിൽ വിശദീകരിക്കുക, പിന്നെ ക്വിസ് ചെയ്യുക.",
    english: "English reference"
  }
};

const curriculum = {
  mathematics: [
    ["Counting Objects", "Count seeds, pencils, stones, and classroom objects to understand numbers.", "How many fingers are on one hand?", ["3", "4", "5", "6"], "5"],
    ["Addition with Pictures", "Addition means putting groups together. Two mangoes and three mangoes make five mangoes.", "2 + 3 equals what?", ["4", "5", "6", "7"], "5"],
    ["Subtraction in Daily Life", "Subtraction means taking away. If you have 9 flowers and give away 4, you have 5 left.", "9 - 4 equals what?", ["3", "4", "5", "6"], "5"],
    ["Multiplication Tables", "Multiplication is repeated addition. Three groups of four make twelve.", "3 x 4 equals what?", ["7", "10", "12", "14"], "12"],
    ["Division and Sharing", "Division helps share things equally among people.", "12 bananas shared by 3 children gives each child how many?", ["2", "3", "4", "6"], "4"],
    ["Fractions at the Market", "Fractions help divide food, land, money, and time into fair parts.", "Half means how many equal parts?", ["1", "2", "3", "4"], "2"],
    ["Decimals and Money", "Decimals help us read rupees, paise, measures, and marks.", "5 rupees 50 paise is written as what?", ["5.05", "5.50", "50.5", "55"], "5.50"],
    ["Percentages in Daily Life", "Percent means out of 100 and helps compare marks, attendance, and discounts.", "25 percent means how many out of 100?", ["10", "20", "25", "50"], "25"],
    ["Linear Equations", "An equation balances two sides. If x + 5 = 12, then x is 7.", "If x + 3 = 9, what is x?", ["3", "6", "9", "12"], "6"],
    ["Data and Graphs", "Graphs turn numbers into pictures and help compare rainfall, marks, and harvest.", "A bar graph compares what?", ["Categories", "Taste", "Sound", "Smell"], "Categories"]
  ],
  science: [
    ["Living and Non-living Things", "Living things grow, need food, and respond to their surroundings.", "Which one is living?", ["Stone", "Plant", "Chair", "Book"], "Plant"],
    ["Plants Around Us", "Plants have roots, stems, leaves, flowers, and fruits.", "Which part of a plant takes in water from soil?", ["Root", "Flower", "Fruit", "Seed"], "Root"],
    ["Animals and Their Homes", "Animals live in different homes such as nests, burrows, sheds, and ponds.", "A bird usually lives in a what?", ["Nest", "Well", "Road", "Bag"], "Nest"],
    ["Air and Water", "Air and water are needed by living things. Clean water keeps us healthy.", "Which is needed for breathing?", ["Air", "Sand", "Paper", "Wood"], "Air"],
    ["Food and Health", "Healthy food gives energy and helps the body grow.", "Which food group helps build the body?", ["Proteins", "Dust", "Plastic", "Smoke"], "Proteins"],
    ["Water Cycle", "Sun heat changes water to vapour. Clouds form and bring rain.", "What changes water into vapour?", ["Sun heat", "Soil", "Seeds", "Moonlight"], "Sun heat"],
    ["Human Digestion", "Digestion breaks food into smaller parts so the body can use nutrients.", "Digestion starts in the what?", ["Mouth", "Ear", "Hand", "Foot"], "Mouth"],
    ["Electric Current", "Current flows through a closed circuit and can light a bulb.", "A bulb glows when the circuit is what?", ["Closed", "Broken", "Wet", "Empty"], "Closed"],
    ["Motion and Force", "Force can change speed, direction, or shape.", "Force can change speed or what?", ["Direction", "Color", "Name", "Price"], "Direction"],
    ["Chemical Reactions", "A chemical reaction forms new substances, such as rust on iron.", "Rusting mainly happens to which metal?", ["Iron", "Gold", "Silver", "Copper"], "Iron"]
  ],
  social: [
    ["My Family and School", "Family and school teach care, sharing, rules, and responsibility.", "Where do students go to learn?", ["School", "River", "Forest", "Market only"], "School"],
    ["Our Neighbourhood", "A neighbourhood has homes, roads, shops, schools, and helpers.", "Who helps keep streets clean?", ["Sanitation worker", "Cloud", "Mountain", "Tree"], "Sanitation worker"],
    ["Village and City Life", "Villages and cities have different occupations, transport, and services.", "Farming is common in many what?", ["Villages", "Oceans", "Deserts only", "Stars"], "Villages"],
    ["Maps and Directions", "Maps show places using symbols and directions.", "Which direction is usually at the top of a map?", ["North", "South", "East", "West"], "North"],
    ["Our Environment", "The environment includes air, water, land, plants, animals, and people.", "Planting trees helps protect what?", ["Environment", "Noise", "Plastic", "Smoke"], "Environment"],
    ["Panchayati Raj", "Panchayats help villages solve local problems like water, roads, and sanitation.", "Who helps solve village issues?", ["Panchayat", "Cloud", "Mountain", "Market price"], "Panchayat"],
    ["India: States and Union Territories", "India has many states and union territories with diverse cultures and languages.", "India is known for cultural what?", ["Diversity", "Silence", "Sameness", "Darkness"], "Diversity"],
    ["Indian Constitution", "The Constitution explains rights, duties, and how government works.", "The Constitution gives rights and what?", ["Duties", "Discounts", "Rain", "Seeds"], "Duties"],
    ["Freedom Movement", "India's freedom movement included leaders, students, workers, and farmers.", "Non-cooperation was part of which movement?", ["Freedom movement", "Water cycle", "Digestion", "Photosynthesis"], "Freedom movement"],
    ["Resources and Development", "Resources become useful when people use knowledge and skill responsibly.", "Using resources carefully is called what?", ["Conservation", "Wastage", "Noise", "Friction"], "Conservation"]
  ],
  english: [
    ["Alphabet Sounds", "Letters make sounds. Sounds join to make words.", "Which letter starts the word apple?", ["A", "B", "C", "D"], "A"],
    ["Simple Words", "Words name people, places, animals, and things.", "Which is an animal?", ["Cat", "Cup", "Pen", "Bus"], "Cat"],
    ["Reading Short Sentences", "A sentence gives a complete idea and starts with a capital letter.", "A sentence usually ends with what?", ["Full stop", "Comma only", "Number", "Arrow"], "Full stop"],
    ["Nouns and Verbs", "A noun names something. A verb shows an action.", "In 'Ravi runs', which word is the action?", ["Runs", "Ravi", "The", "A"], "Runs"],
    ["Paragraph Reading", "A paragraph has sentences about one main idea.", "What supports the main idea?", ["Details", "Silence", "Price", "Weather"], "Details"],
    ["Finding the Main Idea", "The main idea is what a paragraph is mostly about.", "The main idea tells what the paragraph is mostly about. True or false?", ["True", "False", "Maybe", "Never"], "True"],
    ["Tenses in Sentences", "Tense tells whether an action happens in the past, present, or future.", "Which tense is for actions happening now?", ["Present", "Past", "Future", "None"], "Present"],
    ["Writing a Letter", "A letter has a greeting, message, closing, and writer name.", "Which part comes at the beginning of a letter?", ["Greeting", "Closing", "Signature", "Stamp only"], "Greeting"],
    ["Spoken English Practice", "Speaking improves when learners listen, repeat, and use short clear sentences.", "What helps improve speaking?", ["Practice", "Avoiding words", "Sleeping", "Skipping"], "Practice"],
    ["Essay Structure", "An essay has an introduction, body paragraphs, and conclusion.", "What comes at the end of an essay?", ["Conclusion", "Title only", "Question", "Date"], "Conclusion"]
  ],
  regional: [
    ["Home Language Words", "Students learn faster when familiar home words connect to classroom ideas.", "Which language is spoken at home?", ["Home language", "Map", "Bell", "Chair"], "Home language"],
    ["Local Songs and Rhymes", "Rhymes help children hear sounds, rhythm, and meaning.", "Rhymes help with what?", ["Sounds", "Stones", "Dust", "Smoke"], "Sounds"],
    ["Storytelling in Mother Tongue", "Stories in a familiar language build confidence and understanding.", "Stories build what?", ["Confidence", "Darkness", "Distance", "Weight"], "Confidence"],
    ["Reading Local Signs", "Local signs help learners connect reading with real life.", "A shop board is a kind of what?", ["Sign", "Cloud", "River", "Seed"], "Sign"],
    ["Writing Simple Sentences", "Students can write short sentences about family, school, and village life.", "A sentence should give a complete what?", ["Idea", "Stone", "Color only", "Noise"], "Idea"],
    ["Learning Through Mother Tongue", "Difficult ideas become easier when first explained in the home language.", "What helps students understand difficult ideas faster?", ["Home language", "No explanation", "Only marks", "Long silence"], "Home language"],
    ["Poems from Local Life", "Poems can describe rivers, farms, festivals, seasons, and family life.", "Local examples make learning more what?", ["Meaningful", "Confusing", "Invisible", "Heavy"], "Meaningful"],
    ["Translation Skills", "Translation keeps meaning while moving between two languages.", "A good translation should keep the what?", ["Meaning", "Ink", "Paper size", "Noise"], "Meaning"],
    ["Public Speaking in Your Language", "Explaining lessons aloud in a familiar language builds confidence.", "Speaking aloud can build what?", ["Confidence", "Darkness", "Distance", "Weight"], "Confidence"],
    ["Bilingual Exam Support", "Bilingual notes help learners understand concepts and write exam answers.", "Bilingual notes use how many languages?", ["Two", "One", "Zero", "Ten"], "Two"]
  ]
};

const lessons = subjects.flatMap((subject) => curriculum[subject.key].map((chapter, index) => ({
  id: `${subject.key}-${index + 1}`,
  subject: subject.key,
  level: String(index + 1),
  title: chapter[0],
  body: chapter[1],
  question: chapter[2],
  options: chapter[3],
  answer: chapter[4]
})));

const mockTemplates = {
  mathematics: [
    (level) => [`Mock ${level}: Which skill helps compare numbers quickly?`, ["Place value", "Cloud reading", "Plant roots", "Map color"], "Place value"],
    (level) => [`Mock ${level}: What should you do first in a word problem?`, ["Read carefully", "Guess fast", "Skip units", "Hide numbers"], "Read carefully"],
    (level) => [`Mock ${level}: Which tool is useful for checking calculations?`, ["Estimation", "Rhyme", "Compass direction", "Water cycle"], "Estimation"]
  ],
  science: [
    (level) => [`Mock ${level}: What is the first step in a science observation?`, ["Look carefully", "Close eyes", "Change answer", "Ignore result"], "Look carefully"],
    (level) => [`Mock ${level}: Why do we repeat experiments?`, ["To check results", "To waste time", "To avoid learning", "To change topic"], "To check results"],
    (level) => [`Mock ${level}: Which is a safe science habit?`, ["Follow instructions", "Taste chemicals", "Touch wires", "Run in lab"], "Follow instructions"]
  ],
  social: [
    (level) => [`Mock ${level}: Which source helps us know about places?`, ["Map", "Spoon", "Bulb", "Seed"], "Map"],
    (level) => [`Mock ${level}: What helps people live together peacefully?`, ["Rules", "Noise", "Waste", "Confusion"], "Rules"],
    (level) => [`Mock ${level}: Which activity supports the community?`, ["Keeping surroundings clean", "Breaking roads", "Wasting water", "Ignoring others"], "Keeping surroundings clean"]
  ],
  english: [
    (level) => [`Mock ${level}: What makes a sentence complete?`, ["A clear idea", "Only one letter", "No verb ever", "Random words"], "A clear idea"],
    (level) => [`Mock ${level}: Which action improves reading?`, ["Reading daily", "Skipping pages", "Avoiding words", "Closing books"], "Reading daily"],
    (level) => [`Mock ${level}: What should spoken answers be?`, ["Clear", "Silent", "Hidden", "Unfinished"], "Clear"]
  ],
  regional: [
    (level) => [`Mock ${level}: Why is mother tongue useful in learning?`, ["It explains ideas clearly", "It removes meaning", "It stops reading", "It hides examples"], "It explains ideas clearly"],
    (level) => [`Mock ${level}: What helps bilingual learning?`, ["Connecting both languages", "Avoiding home language", "Only copying", "Skipping practice"], "Connecting both languages"],
    (level) => [`Mock ${level}: Which practice builds language confidence?`, ["Speaking aloud", "Staying silent", "Forgetting words", "Ignoring stories"], "Speaking aloud"]
  ]
};

const mockQuestions = subjects.flatMap((subject) => standards.flatMap((level) => (
  mockTemplates[subject.key].map((makeQuestion, index) => {
    const [question, options, answer] = makeQuestion(level);
    return {
      id: `mock-${subject.key}-${level}-${index + 1}`,
      subject: subject.key,
      level,
      question,
      options,
      answer
    };
  })
)));

const defaultProgress = subjects.reduce((all, subject) => {
  all[subject.key] = 25;
  return all;
}, {});

const state = {
  users: JSON.parse(localStorage.getItem(`${storagePrefix}-users`) || "{}"),
  profile: JSON.parse(localStorage.getItem(`${storagePrefix}-profile`) || "{}"),
  progress: { ...defaultProgress, ...JSON.parse(localStorage.getItem(`${storagePrefix}-progress`) || "{}") },
  history: JSON.parse(localStorage.getItem(`${storagePrefix}-history`) || "[]"),
  mockHistory: JSON.parse(localStorage.getItem(`${storagePrefix}-mock-history`) || "[]"),
  currentLesson: null,
  currentMock: null
};

const $ = (selector) => document.querySelector(selector);

function migrateOldSingleProfile() {
  if (Object.keys(state.users).length || !state.profile.studentId) return;
  const studentId = normalizeStudentId(state.profile.studentId);
  if (!studentId) return;
  state.profile.studentId = studentId;
  state.profile.loggedIn = false;
  state.users[studentId] = {
    pin: state.profile.pin || "1234",
    profile: state.profile,
    progress: state.progress,
    history: state.history,
    mockHistory: state.mockHistory
  };
  localStorage.setItem(`${storagePrefix}-users`, JSON.stringify(state.users));
}

function standardLabel(value) {
  const suffix = value === "1" ? "st" : value === "2" ? "nd" : value === "3" ? "rd" : "th";
  return `${value}${suffix} Standard`;
}

function activeLanguage() {
  return state.profile.language || "en-IN";
}

function subjectName(key) {
  return subjects.find((subject) => subject.key === key)?.name || key;
}

function normalizeStudentId(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, "-");
}

function saveState() {
  if (state.profile.studentId && state.users[state.profile.studentId]) {
    const storedProfile = { ...state.profile, loggedIn: false };
    state.users[state.profile.studentId] = {
      ...state.users[state.profile.studentId],
      profile: storedProfile,
      progress: state.progress,
      history: state.history,
      mockHistory: state.mockHistory
    };
  }
  localStorage.setItem(`${storagePrefix}-users`, JSON.stringify(state.users));
  localStorage.setItem(`${storagePrefix}-profile`, JSON.stringify(state.profile));
  localStorage.setItem(`${storagePrefix}-progress`, JSON.stringify(state.progress));
  localStorage.setItem(`${storagePrefix}-history`, JSON.stringify(state.history));
  localStorage.setItem(`${storagePrefix}-mock-history`, JSON.stringify(state.mockHistory));
}

function updateConnection() {
  const online = navigator.onLine;
  $("#connectionDot").className = `dot ${online ? "online" : "offline"}`;
  $("#connectionText").textContent = online ? "Online sync available" : "Offline mode active";
}

function populateSelectors() {
  const languageOptions = languages.map(([code, name]) => `<option value="${code}">${name}</option>`).join("");
  const standardOptions = standards.map((standard) => `<option value="${standard}">${standardLabel(standard)}</option>`).join("");
  $("#languageSelect").innerHTML = languageOptions;
  $("#registerLanguage").innerHTML = languageOptions;
  $("#gradeSelect").innerHTML = standardOptions;
  $("#registerGrade").innerHTML = standardOptions;
  $("#levelFilter").innerHTML = `<option value="all">All standards</option>${standards.map((standard) => `<option value="${standard}">${standardLabel(standard)}</option>`).join("")}`;
  $("#subjectFilter").innerHTML = `<option value="all">All subjects</option>${subjects.map((subject) => `<option value="${subject.key}">${subject.name}</option>`).join("")}`;
  $("#mockSubjectSelect").innerHTML = subjects.map((subject) => `<option value="${subject.key}">${subject.name}</option>`).join("");
}

function updateProfileUi() {
  const name = state.profile.name || "New learner";
  const languageName = languages.find(([code]) => code === activeLanguage())?.[1] || "English";
  $("#studentName").value = state.profile.name || "";
  $("#languageSelect").value = activeLanguage();
  $("#gradeSelect").value = state.profile.grade || "1";
  $("#schoolType").value = state.profile.schoolType || "Rural government school";
  $("#studyTime").value = state.profile.studyTime || "15";
  $("#learningGoal").value = state.profile.learningGoal || "Improve basics";
  $("#loginId").value = state.profile.studentId || "";
  $("#registerName").value = state.profile.name || "";
  $("#registerId").value = state.profile.studentId || "";
  $("#registerLanguage").value = activeLanguage();
  $("#registerGrade").value = state.profile.grade || "1";
  $("#registerSchoolType").value = state.profile.schoolType || "Rural government school";
  $("#profileName").textContent = name;
  $("#profileAvatar").textContent = name.trim().charAt(0).toUpperCase() || "S";
  $("#profileMeta").textContent = `${standardLabel(state.profile.grade || "1")} | ${languageName} | ${state.profile.schoolType || "Rural school"}`;
}

function updateAppVisibility() {
  const registered = Boolean(state.profile.studentId && state.users[state.profile.studentId]);
  const activeSession = sessionStorage.getItem(activeStudentKey) === state.profile.studentId;
  const loggedIn = Boolean(state.profile.loggedIn && state.profile.name && registered && activeSession);
  if (state.profile.loggedIn && (!registered || !activeSession)) {
    state.profile.loggedIn = false;
  }
  $("#loginPage").hidden = loggedIn;
  $("#appShell").hidden = !loggedIn;
  $("#logoutStudent").hidden = !loggedIn;
}

function weakestSubject() {
  return Object.entries(state.progress).sort((a, b) => a[1] - b[1])[0][0];
}

function filteredLessons() {
  const subject = $("#subjectFilter")?.value || "all";
  const level = $("#levelFilter")?.value || "all";
  const learnerLevel = state.profile.grade || "1";
  return lessons
    .filter((lesson) => subject === "all" || lesson.subject === subject)
    .filter((lesson) => level === "all" ? lesson.level === learnerLevel : lesson.level === level)
    .sort((a, b) => {
      const weak = weakestSubject();
      const aScore = a.subject === weak ? -1 : 0;
      const bScore = b.subject === weak ? -1 : 0;
      return aScore - bScore || a.subject.localeCompare(b.subject);
    });
}

function renderLessons() {
  $("#chapterCount").textContent = lessons.length;
  $("#recommendationReason").textContent = `Showing ${standardLabel(state.profile.grade || "1")} chapters first. Focus subject: ${subjectName(weakestSubject())}.`;
  $("#lessonGrid").innerHTML = filteredLessons().map((lesson) => `
    <article class="lesson-card">
      <div>
        <div class="tag-row">
          <span class="tag">${subjectName(lesson.subject)}</span>
          <span class="tag">${standardLabel(lesson.level)}</span>
          <span class="tag">Quiz</span>
          <span class="tag">Offline</span>
        </div>
        <strong>${lesson.title}</strong>
        <p>${lessonBody(lesson).slice(0, 150)}...</p>
      </div>
      <button class="primary-btn" data-lesson="${lesson.id}">Start chapter</button>
    </article>
  `).join("");

  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => openLesson(button.dataset.lesson));
  });
}

function lessonBody(lesson) {
  const languageName = languages.find(([code]) => code === activeLanguage())?.[1] || "English";
  const guidance = languageGuidance[activeLanguage()] || languageGuidance["en-IN"];
  if (activeLanguage() === "en-IN") return lesson.body;
  const regional = regionalExplanations[activeLanguage()];
  if (!regional) {
    return `${guidance[0]} ${guidance[1]} ${guidance[2]} English option: ${lesson.body}`;
  }
  return `${regional.simple} ${regional.example} ${regional.english}: ${lesson.body}`;
}

function openLesson(id) {
  state.currentLesson = lessons.find((lesson) => lesson.id === id);
  $("#lessonTitle").textContent = state.currentLesson.title;
  $("#lessonBody").textContent = lessonBody(state.currentLesson);
  $("#assistantMessage").textContent = buildAssistantMessage("simple");
  $("#questionBox").hidden = false;
  $("#completionActions").hidden = true;
  $("#questionText").textContent = state.currentLesson.question;
  $("#voiceResult").textContent = "";
  $("#answerOptions").innerHTML = state.currentLesson.options.map((option) => `<button data-answer="${option}">${option}</button>`).join("");
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button.dataset.answer, button));
  });
  switchTab("tutor");
}

function normalizeAnswer(value) {
  const spokenNumbers = {
    zero: "0",
    one: "1",
    first: "1",
    two: "2",
    second: "2",
    to: "2",
    too: "2",
    three: "3",
    third: "3",
    four: "4",
    for: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    ate: "8",
    nine: "9",
    ten: "10",
    twelve: "12",
    twenty: "20",
    "twenty five": "25",
    fifty: "50",
    true: "true",
    false: "false"
  };
  return String(value)
    .toLowerCase()
    .replace(/[.,!?]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word, index, words) => {
      const pair = `${word} ${words[index + 1] || ""}`.trim();
      return spokenNumbers[pair] || spokenNumbers[word] || word;
    })
    .join(" ")
    .replace(/\b(\w+) \1\b/g, "$1")
    .trim();
}

function answersMatch(given, expected) {
  const normalizedGiven = normalizeAnswer(given);
  const normalizedExpected = normalizeAnswer(expected);
  return normalizedGiven === normalizedExpected ||
    normalizedGiven.includes(normalizedExpected) ||
    normalizedExpected.includes(normalizedGiven);
}

function checkAnswer(answer, button) {
  if (!state.currentLesson) return;
  const correct = answersMatch(answer, state.currentLesson.answer);
  const skill = state.currentLesson.subject;
  state.progress[skill] = Math.max(0, Math.min(100, state.progress[skill] + (correct ? 12 : -4)));
  state.history.push({
    lessonId: state.currentLesson.id,
    subject: skill,
    level: state.currentLesson.level,
    correct,
    date: new Date().toISOString()
  });
  saveState();
  button.classList.add(correct ? "correct" : "wrong");
  $("#coachMessage").textContent = correct ? "Correct. Sikho India will suggest a stronger practice path." : "Not quite. Sikho India will keep you near this topic.";
  $("#guidanceText").textContent = buildGuidance();
  renderAll();
  showCompletionActions();
}

function getNextLesson() {
  if (!state.currentLesson) return null;
  const ordered = lessons
    .filter((lesson) => lesson.level === state.currentLesson.level)
    .sort((a, b) => subjects.findIndex((subject) => subject.key === a.subject) - subjects.findIndex((subject) => subject.key === b.subject));
  const currentIndex = ordered.findIndex((lesson) => lesson.id === state.currentLesson.id);
  if (currentIndex >= 0 && currentIndex < ordered.length - 1) {
    return ordered[currentIndex + 1];
  }
  const nextLevel = String(Number(state.currentLesson.level) + 1);
  return lessons.find((lesson) => lesson.level === nextLevel && lesson.subject === subjects[0].key) || null;
}

function showCompletionActions() {
  const nextLesson = getNextLesson();
  $("#completionActions").hidden = false;
  $("#nextChapter").disabled = !nextLesson;
  $("#nextChapter").textContent = nextLesson ? `Next chapter: ${nextLesson.title}` : "All chapters completed";
}

function buildAssistantMessage(mode) {
  const lesson = state.currentLesson;
  const languageName = languages.find(([code]) => code === activeLanguage())?.[1] || "English";
  if (!lesson) return "Select a chapter and the Tutor Assistant will help in your chosen language.";
  const guidance = languageGuidance[activeLanguage()] || languageGuidance["en-IN"];
  const regional = regionalExplanations[activeLanguage()];
  if (activeLanguage() !== "en-IN" && regional) {
    if (mode === "example") return `${regional.example} ${regional.english}: ${lesson.body}`;
    if (mode === "revise") return `${regional.revise} ${regional.english}: ${lesson.body}`;
    return `${regional.simple} ${regional.english}: ${lesson.body}`;
  }
  if (mode === "example") {
    return `${languageName}: ${guidance[1]} English option: connect "${lesson.title}" with school, farms, markets, water, maps, festivals, family life, or local helpers.`;
  }
  if (mode === "revise") {
    return `${languageName}: ${guidance[2]} English option: listen once, read once, answer the quiz, correct one mistake, and explain the idea aloud for five minutes.`;
  }
  return `${languageName}: ${guidance[0]} English option: ${lesson.body}`;
}

function buildGuidance() {
  const name = state.profile.name || "Student";
  const weak = weakestSubject();
  const attempts = state.history.length;
  const correct = state.history.filter((item) => item.correct).length;
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  const latestMock = state.mockHistory.at(-1);
  const mockLine = latestMock ? ` Latest mock score is ${latestMock.score}/${latestMock.total}.` : " Start one mock test after completing two chapters.";
  if (accuracy < 50) {
    return `${name}, focus on ${subjectName(weak)} for ${standardLabel(state.profile.grade || "1")}. Study ${state.profile.studyTime || 15} minutes daily: listen to the Tutor Assistant, read the regional explanation, and retry the quiz.${mockLine}`;
  }
  return `${name}, you are progressing well. Next focus: ${subjectName(weak)}. Keep ${state.profile.studyTime || 15} minutes daily for one chapter, one quiz, and one spoken revision.${mockLine}`;
}

function renderProgress() {
  $("#progressList").innerHTML = subjects.map((subject) => `
    <div>
      <span>${subject.name}</span>
      <meter min="0" max="100" value="${state.progress[subject.key] || 0}"></meter>
    </div>
  `).join("");
}

function renderDashboard() {
  const attempts = state.history.length;
  const correct = state.history.filter((item) => item.correct).length;
  const latestMock = state.mockHistory.at(-1);
  $("#completedCount").textContent = attempts;
  $("#accuracyValue").textContent = attempts ? `${Math.round((correct / attempts) * 100)}%` : "0%";
  $("#focusSubject").textContent = subjectName(weakestSubject());
  $("#mockResult").textContent = latestMock
    ? `Latest mock test: ${latestMock.score}/${latestMock.total} in ${subjectName(latestMock.subject || "mathematics")} for ${standardLabel(latestMock.level)} on ${new Date(latestMock.date).toLocaleDateString()}.`
    : "No mock test attempted yet.";
  $("#subjectBoard").innerHTML = subjects.map((subject) => {
    const value = state.progress[subject.key] || 0;
    return `
      <article class="subject-card">
        <strong>${subject.name}</strong>
        <div class="subject-score" aria-hidden="true"><span style="width:${value}%; background:${subject.color}"></span></div>
        <p>${value}% local mastery</p>
      </article>
    `;
  }).join("");
}

function buildMockQuestions() {
  const learnerLevel = state.profile.grade || "1";
  const selectedSubject = $("#mockSubjectSelect").value || subjects[0].key;
  return mockQuestions
    .filter((lesson) => lesson.level === learnerLevel && lesson.subject === selectedSubject)
    .filter(Boolean);
}

function renderMockQuestion() {
  if (!state.currentMock) return;
  const current = state.currentMock.questions[state.currentMock.index];
  $("#mockTestBox").hidden = false;
  $("#mockProgressText").textContent = `Question ${state.currentMock.index + 1} of ${state.currentMock.questions.length}`;
  $("#mockQuestionText").textContent = `${subjectName(current.subject)}: ${current.question}`;
  $("#mockAnswerOptions").innerHTML = current.options.map((option) => `<button data-mock-answer="${option}">${option}</button>`).join("");
  document.querySelectorAll("[data-mock-answer]").forEach((button) => {
    button.addEventListener("click", () => answerMockQuestion(button.dataset.mockAnswer, button));
  });
}

function startMockTest() {
  const questions = buildMockQuestions();
  state.currentMock = {
    level: state.profile.grade || "1",
    subject: $("#mockSubjectSelect").value || subjects[0].key,
    questions,
    index: 0,
    score: 0
  };
  $("#mockResult").textContent = "Mock test in progress.";
  renderMockQuestion();
}

function answerMockQuestion(answer, button) {
  if (!state.currentMock) return;
  const current = state.currentMock.questions[state.currentMock.index];
  const correct = answersMatch(answer, current.answer);
  if (correct) state.currentMock.score += 1;
  state.progress[current.subject] = Math.max(0, Math.min(100, state.progress[current.subject] + (correct ? 6 : -2)));
  button.classList.add(correct ? "correct" : "wrong");
  state.currentMock.index += 1;
  if (state.currentMock.index >= state.currentMock.questions.length) {
    const result = {
      level: state.currentMock.level,
      subject: state.currentMock.subject,
      score: state.currentMock.score,
      total: state.currentMock.questions.length,
      date: new Date().toISOString()
    };
    state.mockHistory.push(result);
    state.currentMock = null;
    saveState();
    $("#mockTestBox").hidden = true;
    $("#mockResult").textContent = `Mock test completed: ${result.score}/${result.total}. ${buildGuidance()}`;
    renderAll();
    return;
  }
  saveState();
  setTimeout(renderMockQuestion, 350);
}

function renderTeacherNotes(correct = null) {
  const notes = [
    `Learner: ${state.profile.name || "Unnamed"} | Level: ${standardLabel(state.profile.grade || "1")} | Language: ${languages.find(([code]) => code === activeLanguage())?.[1] || "English"}`,
    `Goal: ${state.profile.learningGoal || "Improve basics"} | Daily time: ${state.profile.studyTime || 15} minutes`,
    `Focus subject: ${subjectName(weakestSubject())}`
  ];
  if (correct !== null && state.currentLesson) {
    notes.push(`${state.currentLesson.title}: ${correct ? "answered correctly" : "needs reinforcement"}.`);
  }
  $("#teacherNotes").innerHTML = notes.map((note) => `<li>${note}</li>`).join("");
}

function renderAll() {
  updateProfileUi();
  updateAppVisibility();
  renderDashboard();
  renderProgress();
  renderLessons();
  renderTeacherNotes();
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    $("#voiceResult").textContent = "Speech is not supported in this browser.";
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = activeLanguage();
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}

function speakTutorExplanation() {
  if (!state.currentLesson) return;
  if (!("speechSynthesis" in window)) {
    $("#voiceResult").textContent = "Speech is not supported in this browser.";
    return;
  }
  const languageName = languages.find(([code]) => code === activeLanguage())?.[1] || "English";
  const guidance = languageGuidance[activeLanguage()] || languageGuidance["en-IN"];
  const regionalText = activeLanguage() === "en-IN"
    ? `English explanation. ${state.currentLesson.body}`
    : `${languageName} explanation. ${guidance[0]} ${guidance[1]} ${guidance[2]}`;
  const englishText = `English explanation. ${state.currentLesson.title}. ${state.currentLesson.body}. Quiz question. ${state.currentLesson.question}`;
  const parts = activeLanguage() === "en-IN"
    ? [{ text: englishText, lang: "en-IN" }]
    : [{ text: regionalText, lang: activeLanguage() }, { text: englishText, lang: "en-IN" }];

  speechSynthesis.cancel();
  parts.forEach((part) => {
    const utterance = new SpeechSynthesisUtterance(part.text);
    utterance.lang = part.lang;
    utterance.rate = 0.88;
    speechSynthesis.speak(utterance);
  });
}

function startVoiceAnswer() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    $("#voiceResult").textContent = "Voice answer needs Chrome or Edge microphone support. Use the quiz buttons if it is blocked.";
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = activeLanguage();
  recognition.interimResults = false;
  recognition.continuous = false;
  recognition.maxAlternatives = 5;
  $("#voiceResult").textContent = "Listening...";
  recognition.onresult = (event) => {
    const alternatives = Array.from(event.results[0]).map((result) => result.transcript.trim());
    const matched = alternatives.find((transcript) => answersMatch(transcript, state.currentLesson.answer)) || alternatives[0];
    $("#voiceResult").textContent = `Heard: ${matched}`;
    checkAnswer(matched, document.createElement("button"));
  };
  recognition.onerror = () => {
    $("#voiceResult").textContent = "Microphone could not hear clearly or permission was blocked. Try again in Chrome/Edge or tap an answer.";
  };
  recognition.onend = () => {
    if ($("#voiceResult").textContent === "Listening...") {
      $("#voiceResult").textContent = "No voice heard. Try again closer to the microphone.";
    }
  };
  recognition.start();
}

function switchTab(tabName) {
  document.querySelectorAll(".nav-btn, .tab-panel").forEach((node) => node.classList.remove("active"));
  document.querySelector(`.nav-btn[data-tab="${tabName}"]`).classList.add("active");
  $(`#${tabName}`).classList.add("active");
}

function simulateDownload() {
  $("#syncText").textContent = "Saving Sikho India class 1 to 10 lesson pack to this device...";
  $("#syncBar").style.width = "100%";
  localStorage.setItem(`${storagePrefix}-pack`, "expanded");
  setTimeout(() => {
    $("#syncText").textContent = "All standards, chapters, quizzes, profile, and progress are available offline.";
  }, 500);
}

function switchAuthPanel(panel) {
  const loginActive = panel === "login";
  $("#loginPanel").classList.toggle("active", loginActive);
  $("#registerPanel").classList.toggle("active", !loginActive);
  $("#showLogin").classList.toggle("active", loginActive);
  $("#showRegister").classList.toggle("active", !loginActive);
}

function resetStudentLearning() {
  state.progress = { ...defaultProgress };
  state.history = [];
  state.mockHistory = [];
  state.currentLesson = null;
  state.currentMock = null;
}

function loadRegisteredStudent(studentId) {
  const user = state.users[studentId];
  state.profile = { ...user.profile, loggedIn: true, lastLoginAt: new Date().toISOString() };
  state.progress = { ...defaultProgress, ...(user.progress || {}) };
  state.history = user.history || [];
  state.mockHistory = user.mockHistory || [];
  sessionStorage.setItem(activeStudentKey, studentId);
  saveState();
}

function clearAccessData() {
  [
    `${storagePrefix}-users`,
    `${storagePrefix}-profile`,
    `${storagePrefix}-progress`,
    `${storagePrefix}-history`,
    `${storagePrefix}-mock-history`,
    `${storagePrefix}-pack`
  ].forEach((key) => localStorage.removeItem(key));
  sessionStorage.removeItem(activeStudentKey);
  state.users = {};
  state.profile = {};
  state.progress = { ...defaultProgress };
  state.history = [];
  state.mockHistory = [];
  state.currentLesson = null;
  state.currentMock = null;
  $("#loginId").value = "";
  $("#loginPin").value = "";
  $("#registerId").value = "";
  $("#registerName").value = "";
  $("#registerPin").value = "";
  switchAuthPanel("register");
  renderAll();
  $("#loginMessage").textContent = "Old test registrations cleared. Register again, then login.";
}

function bindEvents() {
  $("#showRegister").addEventListener("click", () => {
    switchAuthPanel("register");
    $("#loginMessage").textContent = "";
  });
  $("#showLogin").addEventListener("click", () => {
    switchAuthPanel("login");
    $("#loginMessage").textContent = "";
  });

  $("#registerStudent").addEventListener("click", () => {
    const name = $("#registerName").value.trim();
    const studentId = normalizeStudentId($("#registerId").value);
    const pin = $("#registerPin").value.trim();
    if (!name || !studentId || !pin) {
      $("#loginMessage").textContent = "Please enter name, student ID, and PIN to register.";
      return;
    }
    if (!/^[a-z0-9._-]+$/.test(studentId)) {
      $("#loginMessage").textContent = "Student ID can use only letters, numbers, dot, dash, or underscore.";
      return;
    }
    if (pin.length < 4) {
      $("#loginMessage").textContent = "PIN must be at least 4 digits or characters.";
      return;
    }
    if (state.users[studentId]) {
      $("#loginMessage").textContent = "This Student ID is already registered. Please create a different Student ID.";
      return;
    }
    resetStudentLearning();
    state.profile = {
      studentId,
      name,
      language: $("#registerLanguage").value,
      grade: $("#registerGrade").value,
      schoolType: $("#registerSchoolType").value,
      studyTime: "15",
      learningGoal: "Improve basics",
      loggedIn: false,
      registeredAt: new Date().toISOString(),
      lastLoginAt: ""
    };
    state.users[studentId] = {
      pin,
      profile: state.profile,
      progress: state.progress,
      history: state.history,
      mockHistory: state.mockHistory
    };
    saveState();
    $("#registerPin").value = "";
    switchAuthPanel("login");
    $("#loginId").value = studentId;
    $("#loginPin").value = "";
    $("#loginMessage").textContent = "Registration successful. Now login with your Student ID and PIN.";
    renderAll();
  });

  $("#loginStudent").addEventListener("click", () => {
    const studentId = normalizeStudentId($("#loginId").value);
    const pin = $("#loginPin").value.trim();
    const user = state.users[studentId];
    if (!studentId || !pin) {
      $("#loginMessage").textContent = "Please enter registered Student ID and PIN.";
      return;
    }
    if (!user || user.pin !== pin) {
      $("#loginMessage").textContent = `Login failed for "${studentId}". Register first or use the exact PIN. For old test data, click "Clear old test registrations".`;
      return;
    }
    loadRegisteredStudent(studentId);
    $("#loginPin").value = "";
    $("#loginMessage").textContent = "";
    renderAll();
    switchTab("dashboard");
  });

  $("#logoutStudent").addEventListener("click", () => {
    state.profile.loggedIn = false;
    sessionStorage.removeItem(activeStudentKey);
    saveState();
    renderAll();
  });

  $("#resetAccess").addEventListener("click", clearAccessData);

  $("#saveProfile").addEventListener("click", () => {
    state.profile = {
      studentId: state.profile.studentId,
      name: $("#studentName").value.trim(),
      language: $("#languageSelect").value,
      grade: $("#gradeSelect").value,
      schoolType: $("#schoolType").value,
      studyTime: $("#studyTime").value,
      learningGoal: $("#learningGoal").value,
      loggedIn: true,
      registeredAt: state.profile.registeredAt,
      lastLoginAt: state.profile.lastLoginAt || new Date().toISOString()
    };
    saveState();
    renderAll();
    $("#coachMessage").textContent = "Learner profile saved for Sikho India.";
  });

  $("#languageSelect").addEventListener("change", () => {
    state.profile.language = $("#languageSelect").value;
    saveState();
    renderAll();
    if (state.currentLesson) openLesson(state.currentLesson.id);
  });

  $("#gradeSelect").addEventListener("change", () => {
    state.profile.grade = $("#gradeSelect").value;
    saveState();
    renderAll();
  });

  $("#subjectFilter").addEventListener("change", renderLessons);
  $("#levelFilter").addEventListener("change", renderLessons);

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  });

  document.querySelectorAll("[data-help]").forEach((button) => {
    button.addEventListener("click", () => {
      $("#assistantMessage").textContent = buildAssistantMessage(button.dataset.help);
    });
  });

  $("#speakLesson").addEventListener("click", () => {
    if (!state.currentLesson) return;
    speakTutorExplanation();
  });
  $("#voiceAnswer").addEventListener("click", startVoiceAnswer);
  $("#nextChapter").addEventListener("click", () => {
    const nextLesson = getNextLesson();
    if (nextLesson) openLesson(nextLesson.id);
  });
  $("#backToChapters").addEventListener("click", () => switchTab("lessons"));
  $("#downloadPack").addEventListener("click", simulateDownload);
  $("#makePlan").addEventListener("click", () => {
    $("#guidanceText").textContent = buildGuidance();
  });
  $("#startMockTest").addEventListener("click", startMockTest);
  window.addEventListener("online", updateConnection);
  window.addEventListener("offline", updateConnection);
}

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
    } catch (error) {
      console.warn("Service worker registration failed", error);
    }
  }
}

migrateOldSingleProfile();
populateSelectors();
updateConnection();
renderAll();
bindEvents();
registerServiceWorker();
