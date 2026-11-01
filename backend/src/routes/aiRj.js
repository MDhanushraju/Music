import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// 1. Supported Languages Definition
export const SUPPORTED_LANGUAGES = {
  kannada: { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🟡🔴' },
  telugu: { code: 'te-IN', name: 'Telugu', native: 'తెలుగు', flag: '💠' },
  tamil: { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்', flag: '🪔' },
  hindi: { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  malayalam: { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം', flag: '🌴' },
  marathi: { code: 'mr-IN', name: 'Marathi', native: 'मराठी', flag: '🚩' },
  bengali: { code: 'bn-IN', name: 'Bengali', native: 'বাংলা', flag: '🪷' },
  punjabi: { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🌾' },
  gujarati: { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી', flag: '🪁' },
  english: { code: 'en-IN', name: 'English (Indian FM)', native: 'English', flag: '🎙️' }
};

// 2. City Profiles with Coordinates, State, Default Language, Traffic Hotspots, and Songs
export const CITY_PROFILES = {
  bengaluru: {
    name: 'Bengaluru',
    state: 'Karnataka',
    country: 'India',
    defaultLanguage: 'kannada',
    lat: 12.9716,
    lng: 77.5946,
    rj: 'RJ Kavya',
    frequency: '91.1 MHz',
    culture: 'Tech innovation, filter coffee, garden city, vibrant startup energy and indie music',
    trafficCorridors: [
      { road: 'Silk Board Junction', status: 'Moderate to heavy crawl approaching Hosur Road' },
      { road: 'Outer Ring Road (Marathahalli to Bellandur)', status: 'Slow moving around tech park entries' },
      { road: 'Hebbal Flyover', status: 'Steady flow toward the airport with minor merge delays' },
      { road: 'Tin Factory / Old Madras Road', status: 'Congestion near KR Puram railway station' }
    ],
    song: {
      id: 'blr-namma-morning',
      title: 'Filter Coffee Morning - Acoustic Strings',
      artist: 'RJ Kavya & Grassroots Band',
      audioUrl: '/audio/bengaluru-namma-morning.mp3',
      genre: 'Acoustic Indie'
    }
  },
  mumbai: {
    name: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    defaultLanguage: 'marathi',
    lat: 19.0760,
    lng: 72.8777,
    rj: 'RJ Rohit',
    frequency: '98.3 MHz',
    culture: 'The city that never sleeps, Bollywood beats, coastal sea breeze, local trains and relentless spirit',
    trafficCorridors: [
      { road: 'Western Express Highway (Andheri to Bandra)', status: 'High volume with slow moving stretches near airport flyovers' },
      { road: 'Eastern Freeway & SCLR', status: 'Smooth moving with minor pinch points near Chembur' },
      { road: 'Bandra-Worli Sea Link approach', status: 'Brisk sea-breeze commute with clear toll gates' },
      { road: 'Dadar TT Circle & Senapati Bapat Marg', status: 'Heavy market traffic moving steadily' }
    ],
    song: {
      id: 'mum-meri-jaan',
      title: 'Aamchi Mumbai - Retro Bollywood Beat',
      artist: 'RJ Rohit & The Marine Waves',
      audioUrl: '/audio/mumbai-meri-jaan.mp3',
      genre: 'Bollywood Chill'
    }
  },
  delhi: {
    name: 'Delhi',
    state: 'Delhi NCR',
    country: 'India',
    defaultLanguage: 'hindi',
    lat: 28.7041,
    lng: 77.1025,
    rj: 'RJ Kabir',
    frequency: '104.0 MHz',
    culture: 'Dilwalon ki Dilli, heritage monuments, bustling food streets, lively winters and grand celebrations',
    trafficCorridors: [
      { road: 'DND Flyway (Delhi to Noida)', status: 'Steady pace with slight delays near Mayur Vihar exit' },
      { road: 'Ashram Flyover & Ring Road', status: 'Congested moving traffic near Lajpat Nagar' },
      { road: 'Rao Tula Ram Marg & Airport Express corridor', status: 'Clear sailing towards Mahipalpur' },
      { road: 'Connaught Place Outer Circle', status: 'Brisk vehicular movement around central heritage corridors' }
    ],
    song: {
      id: 'del-dilli6-gupshup',
      title: 'Dilli 6 Gupshup - Soulful Sufi Beats',
      artist: 'RJ Kabir & Dilli Gharana',
      audioUrl: '/audio/delhi-dilli6-gupshup.mp3',
      genre: 'Sufi Indie'
    }
  },
  chennai: {
    name: 'Chennai',
    state: 'Tamil Nadu',
    country: 'India',
    defaultLanguage: 'tamil',
    lat: 13.0827,
    lng: 80.2707,
    rj: 'RJ Ananya',
    frequency: '93.5 MHz',
    culture: 'Carnatic traditions, Marina beach sunsets, steaming filter kapi, cinema enthusiasm and temple majesty',
    trafficCorridors: [
      { road: 'OMR Expressway (Tidel Park to Sholinganallur)', status: 'Slow moving traffic along the IT corridor stretch' },
      { road: 'Kathipara Junction & Guindy', status: 'Moderate crawl across cloverleaf entry ramps' },
      { road: 'Anna Salai (Mount Road)', status: 'Steady movement through T. Nagar and Thousand Lights' },
      { road: 'Poonamallee High Road', status: 'Minor delays approaching Chennai Central zone' }
    ],
    song: {
      id: 'chn-morning-kapi',
      title: 'Mylapore Strings - Morning Kapi Melodies',
      artist: 'RJ Ananya',
      audioUrl: '/audio/chennai-morning-kapi.mp3',
      genre: 'Carnatic Fusion'
    }
  },
  hyderabad: {
    name: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    defaultLanguage: 'telugu',
    lat: 17.3850,
    lng: 78.4867,
    rj: 'RJ Vikram',
    frequency: '92.7 MHz',
    culture: 'City of Pearls, aromatic authentic Biryani, Irani chai with Osmania biscuits, vibrant tech parks',
    trafficCorridors: [
      { road: 'Gachibowli to Hitec City Junction', status: 'Slow moving traffic near Mindspace and Bio-Diversity flyover' },
      { road: 'Punjagutta Flyover & Begumpet', status: 'Moderate rush with smooth bypass ramps' },
      { road: 'PV Narasimha Rao Expressway', status: 'Free flow towards Rajiv Gandhi International Airport' },
      { road: 'KBR Park & Jubilee Hills Checkpost', status: 'Steady evening crawl through the cafe district' }
    ],
    song: {
      id: 'hyd-biryani-bass',
      title: 'Biryani & Bass - Tollywood Club Groove',
      artist: 'RJ Vikram',
      audioUrl: '/audio/hyderabad-biryani-bass.mp3',
      genre: 'Tollywood Beats'
    }
  },
  kolkata: {
    name: 'Kolkata',
    state: 'West Bengal',
    country: 'India',
    defaultLanguage: 'bengali',
    lat: 22.5726,
    lng: 88.3639,
    rj: 'RJ Sourav',
    frequency: '91.9 MHz',
    culture: 'City of Joy, lively tea-stall Adda, timeless tramways, literary festivals and soul-stirring melodies',
    trafficCorridors: [
      { road: 'Maa Flyover (Park Circus to Salt Lake)', status: 'Moderate flow with slow movement near bridge descent' },
      { road: 'Howrah Bridge Approach & Strand Road', status: 'Dense heritage traffic moving steadily across the Hooghly' },
      { road: 'EM Bypass near Science City', status: 'Brisk vehicular movement with smooth flyover exits' },
      { road: 'AJC Bose Road Flyover', status: 'Slow crawl during peak office hours' }
    ],
    song: {
      id: 'kol-nostalgia-adda',
      title: 'College Street Rock - Calcutta Adda',
      artist: 'RJ Sourav & Bangla Band',
      audioUrl: '/audio/kolkata-rock.mp3',
      genre: 'Bengali Rock'
    }
  },
  pune: {
    name: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    defaultLanguage: 'marathi',
    lat: 18.5204,
    lng: 73.8567,
    rj: 'RJ Tanmay',
    frequency: '95.0 MHz',
    culture: 'Oxford of the East, Puneri wit, youthful college campuses, historic wadas and scenic monsoon hills',
    trafficCorridors: [
      { road: 'Hinjewadi Phase 1 Flyover', status: 'High volume tech commuter traffic moving slowly' },
      { road: 'Chandani Chowk Junction', status: 'Smoother flow following the multi-tier elevated upgrades' },
      { road: 'Senapati Bapat Road & FC Road', status: 'Lively student and shopping traffic moving steadily' },
      { road: 'Pune-Nagar Road near Viman Nagar', status: 'Moderate delays approaching Phoenix Mall junction' }
    ],
    song: {
      id: 'pun-fc-road-buzz',
      title: 'FC Road Buzz - Collegiate Indie Beat',
      artist: 'RJ Tanmay & Campus Jam',
      audioUrl: '/audio/bengaluru-chai-code.mp3',
      genre: 'Campus Indie'
    }
  },
  kochi: {
    name: 'Kochi',
    state: 'Kerala',
    country: 'India',
    defaultLanguage: 'malayalam',
    lat: 9.9312,
    lng: 76.2673,
    rj: 'RJ Nithin',
    frequency: '94.3 MHz',
    culture: 'Queen of the Arabian Sea, scenic backwaters, banana chips, colonial Fort Kochi and maritime charm',
    trafficCorridors: [
      { road: 'Edappally Lulu Junction Bypass', status: 'Slow moving traffic around the highway flyover merge' },
      { road: 'Kundannoor Junction & Maradu', status: 'Steady flow with minor bottle-necks near bridge works' },
      { road: 'MG Road & Marine Drive stretch', status: 'Smooth breeze-filled coastal traffic flow' },
      { road: 'Vyttila Mobility Hub corridor', status: 'Moderate bus transit traffic moving orderly' }
    ],
    song: {
      id: 'koc-malabar-chill',
      title: 'Malabar Sunset Melodies',
      artist: 'RJ Nithin',
      audioUrl: '/audio/goa-sunset-chill.mp3',
      genre: 'Coastal Indie'
    }
  },
  goa: {
    name: 'Goa',
    state: 'Goa',
    country: 'India',
    defaultLanguage: 'english',
    lat: 15.2993,
    lng: 74.1240,
    rj: 'RJ Leo',
    frequency: '92.7 MHz',
    culture: 'Susegad relaxed lifestyle, golden shorelines, heritage Portuguese villas and acoustic sunset sessions',
    trafficCorridors: [
      { road: 'Mandovi Atal Setu & Panjim approach', status: 'Scenic breezy flow with clear bridge lanes' },
      { road: 'Porvorim Highway Junction', status: 'Moderate crawl around market crossings' },
      { road: 'Calangute - Baga Coastal Road', status: 'Lively vacation pedestrian and scooter movement' }
    ],
    song: {
      id: 'goa-anjuna-chill',
      title: 'Anjuna Golden Hour - Coastal Reggae Chill',
      artist: 'RJ Leo & The Beach Boys',
      audioUrl: '/audio/goa-sunset-chill.mp3',
      genre: 'Reggae Chill'
    }
  },
  ahmedabad: {
    name: 'Ahmedabad',
    state: 'Gujarat',
    country: 'India',
    defaultLanguage: 'gujarati',
    lat: 23.0225,
    lng: 72.5714,
    rj: 'RJ Dhwani',
    frequency: '94.3 MHz',
    culture: 'Heritage UNESCO city, business acumen, Sabarmati riverfront strolls, hot Fafda-Jalebi and Garba spirit',
    trafficCorridors: [
      { road: 'SG Highway (ISKCON to Pakwan Cross Road)', status: 'Steady vehicular flow with minor signals slow-down' },
      { road: 'Ashram Road along the Sabarmati', status: 'Moderate office traffic moving with ease' },
      { road: 'Nehrunagar Circle & Shivranjani', status: 'Lively evening market commuter rush' }
    ],
    song: {
      id: 'ahm-sabarmati-beats',
      title: 'Sabarmati Sunset - Garba Fusion Grooves',
      artist: 'RJ Dhwani & Gujarat Folk Ensemble',
      audioUrl: '/audio/mumbai-meri-jaan.mp3',
      genre: 'Folk Fusion'
    }
  },
  chandigarh: {
    name: 'Chandigarh',
    state: 'Punjab & Haryana',
    country: 'India',
    defaultLanguage: 'punjabi',
    lat: 30.7333,
    lng: 76.7794,
    rj: 'RJ Simran',
    frequency: '93.5 MHz',
    culture: 'The City Beautiful, open green sectors, Sukhna lake serenity, energetic Punjabi beats and hearty feasts',
    trafficCorridors: [
      { road: 'Tribune Chowk roundabout', status: 'Heavy incoming traffic from Zirakpur moving gradually' },
      { road: 'Madhya Marg (Sector 26 to PGI)', status: 'Steady disciplined traffic through the commercial sector' },
      { road: 'Dakshin Marg', status: 'Clear sailing with smooth signal coordination' }
    ],
    song: {
      id: 'chd-bhangra-soul',
      title: 'Gedi Route Beats - Urban Desi Vibe',
      artist: 'RJ Simran & Chandigarh Beats',
      audioUrl: '/audio/delhi-dilli6-gupshup.mp3',
      genre: 'Urban Punjabi'
    }
  }
};

// 3. Multilingual Comedian Joke Bank (Culturally authentic, clean, funny & localized)
export const MULTILINGUAL_JOKES = {
  kannada: {
    bengaluru: [
      "A Bangalore techie went to a temple and asked the priest: 'Swamy, will I get Moksha?' Priest replied: 'Son, Moksha is easy, but getting an apartment flat without a 10-month deposit in Indiranagar is the real spiritual test!'",
      "I asked auto-anna today if he would take me to Silk Board. He looked at me with deep sympathy, handed me a packet of biscuits and said: 'Maga, take this... you will need survival supplies for the journey!'",
      "Why do Bengaluru startups never need air conditioning in December? Because our code freezes on production anyway!",
      "My friend told me: 'I have achieved work-life balance in Bangalore!' I asked how? He said: 'I work 8 hours in office, and spend 8 hours in Silk Board traffic meditating on life!'"
    ],
    generic: [
      "A musical note went to school. The teacher asked: 'Why are you crying?' The note said: 'Master, I wanted to be a sharp student, but everybody says I fell flat!'",
      "My doctor advised me: 'Listening to good radio while drinking hot coffee reduces stress.' So now I drink four cups of filter kapi and turn Tarang Radio to full volume!"
    ]
  },
  telugu: {
    hyderabad: [
      "A Hyderabadi friend called me at 8 PM and said: 'Bhaiya, just 2 minutes away, parking the bike!' I checked his live location... he was still ordering single biryani in Paradise Secunderabad!",
      "Why did the software engineer in Gachibowli bring a spoon to the traffic signal? Because the wait time at the junction is long enough to finish an entire handi of biryani!",
      "I asked a Hyderabadi doctor for a healthy diet plan. He wrote on the prescription: 'Morning one cup Irani chai with Osmania biscuit, afternoon light Dum Biryani, and evening full volume Telugu songs on Tarang FM!'",
      "In Hyderabad, GPS does not tell you turn left or right. It says: 'Bhaiya, go straight till the smell of fresh haleem comes, then take U-turn!'"
    ],
    generic: [
      "Why did the smartphone buy spectacles? Because it completely lost all of its contacts!",
      "My friend said he wants to start a gym where people just listen to fast Telugu beats. I told him: 'Brother, we already have that, it is called boarding an RTC express bus!'"
    ]
  },
  tamil: {
    chennai: [
      "I asked a Chennai auto-anna: 'Anna, meter poduveengala?' Anna gave a peaceful smile and said: 'Thambi, meter is just a showpiece! For NASA to calculate distance to Mars is easy, but my fare from T. Nagar to Marina is purely divine intuition!'",
      "Chennai has two weather seasons: Summer, and Extreme Hot Filter Kapi Summer! The only thing that stays cool in our city is the RJ's attitude on Tarang FM!",
      "Why do Chennai IT people love Marina Beach? Because the only thing faster than our internet connection is the sea breeze blowing away our Monday morning bugs!",
      "My friend asked me: 'Why do you drink hot filter coffee even when it is 34 degrees outside?' I said: 'Thambi, filter coffee is not a beverage, it is a biological requirement in Tamil Nadu!'"
    ],
    generic: [
      "Why did the mridangam player arrive early to the concert? Because he wanted to make sure nobody stole his rhythm!",
      "A guy went to buy a radio. The shopkeeper said: 'This radio will last 20 years.' The guy asked: 'What if it stops?' Shopkeeper said: 'Just switch to Tarang FM, good music never stops!'"
    ]
  },
  hindi: {
    delhi: [
      "Delhi mein ek bande ne traffic police wale se bola: 'Bhai tu jaanta hai mera baap kaun hai?' Police wale ne smile karke bola: 'Bhai, Delhi Metro ka GPS sab bata sakta hai, par ye secret to mujhe bhi nahi pata!'",
      "Delhi ki sardi aur Delhi walon ka swag... dono achanak aate hain aur seedha dil pe lagte hain! Bas DND flyway pe horn kam bajao aur gaane full volume chalao!",
      "Sarojini Nagar market mein ek ladki ne 1000 rupaye ki dress ke 150 rupaye offer kiye. Shopkeeper ne hath jod ke bola: 'Didi, ek kaam karo, dukaan ki chabi bhi le jao!'",
      "Dilli walon ki sabse badi fitness routine kya hai? Shaam ko momos khana, aur fir dosto ko kehna: 'Bhai kal se pakka gym shuru!'"
    ],
    generic: [
      "Doctor ne pucha: 'Aapko music sunte waqt kaisa lagta hai?' Mareez bola: 'Doctor sahab, gaane achhe ho to bimari bhool jaata hu, aur RJ achha ho to hansi nahi rukti!'",
      "Ek aadmi ne traffic signal se pucha: 'Bhai tu kaisa hai?' Signal bola: 'Pooch mat yaar! Jab laal hota hu to sab dekhte hain, aur jaise hi green hota hu, sab chhod ke bhaag jaate hain!'"
    ]
  },
  marathi: {
    mumbai: [
      "Mumbai local train madhye ek passenger bolla: 'Bhai thoda saraka, chauthi seat bante ka bagha!' Dusra bolla: 'Dada, he local train aahe ka Boeing flight, chauthi seat kashi banel?' Tithla Puneri pravasi bolla: 'Adjust kara, Mumbai chi shaan chauthi seat madhech aahe!'",
      "Mumbai chya pavsat don goshti kadhich band padat nahit: ek mhanje Vada Pav cha thela, ani dusra mhanje Tarang Radio cha zabardast gana!",
      "Western Express Highway var ek gadi wala 2 taas thambla hota. Tyane shejarchya gadi walya la vicharla: 'Bhai aage kya hua?' Shejarcha bolla: 'Kahi nahi, aapan fakt weekend enjoy kartoy!'",
      "Mumbai madhye jar koni bolla 'Me 5 minitat aalo', tar samjaycha tyane ajun ghratun chappal sudhha ghalileli nahi!"
    ],
    pune: [
      "Pune madhye dukanacha board hota: 'Dupari 1 te 4 dukan purna band rahil. Grahakanni aplya garja 1 chya aat sampvavya!' He fakt Punyatach ghadu shakta!",
      "Hinjewadi bridge var ek techie bolla: 'Traffic itka slow aahe ki me car madhe basun purna app release deploy keli ani client kadun appreciation mail pan aala!'",
      "Puneri patya vachun ek tourist chakit jhala. Board var lihil hota: 'Ye the shahanpan shikvu naye, aamhi janmatach shikun aalo aahot!'",
      "Punyat misal khanyachi ekach shart: tondatun aag nighali tari chehryavar hasu pahije!"
    ],
    generic: [
      "Eka manasane radio kharedi kela. To bolla: 'He FM station majhya manasarkha boltay.' Tyacha mitra bolla: 'Te Tarang Radio aahe, tithe saglech aple astat!'"
    ]
  },
  bengali: {
    kolkata: [
      "Kolkata-r parar chaayer dokane tinjon dada bikel bela bikel 4-te theke raat 9-ta obdi adda marchhen. Topic: 'World Economy keno Howrah Bridge-er traffic-er moto thamke gelo!' Etai holo ashol Bangali adda!",
      "Ekjon bhodrolok bolchhen: 'Kolkata-e shobcheye boro shanti ki?' Dusrojon uttor dilo: 'Bikel bela bhat-ghoom, sandhye bela gorom singara, ar Tarang Radio-te rabindra-fusion!'",
      "College Street-e ek boi-bikreta ke jigyesh korlam: 'Dada, ei boi-ta porle ki shanti pabo?' Tini bollen: 'Boi-te shanti thakuk ba na thakuk, cha-er dokane bhalo bhashon dite parben!'",
      "Kolkata-r tram ar prem... duto-i khub dhire dhire chole, kintu du-joneri chharte mon chay na!"
    ],
    generic: [
      "Doctor bollo: 'Apnar BP khub beshi!' Rogi bollo: 'Dada, gaan chalun, gaan shune shob thik hoye jaabe!'"
    ]
  },
  malayalam: {
    kochi: [
      "Kochi-yil oru auto-chetanodu vazhi chodichaal parayum: 'Aah pandu oru palam undaayirunnu, athu polichu kalanju, athinte edathuvasham poyko!' Chetta, illatha palam nokki njaan engane pokum?",
      "Kochi Water Metro-yil kayariya oru yuvavu: 'Enthooru bhangi, ithu boat aano atho floating five-star cafe aano!' Friend paranju: 'Monu, ithaanu nammude Kochi!'",
      "Banana chips kazhikkathae oru Malayali-kkum sandhya poorthiyavilla. Athinte koode nalla oru paattu Tarang Radio-yil koodi kettal, pinne vere level aane!",
      "Edappally junction-il traffic kidakkumbozhaanu pala aalukalum swantham aathmaveedhi-ye kurichu chinthikkunnathu!"
    ],
    generic: [
      "Radio kettal manassinu santhosham varum ennu doctor paranju. Athukondu njaan ippol Tarang FM 24 manikkoorum on aakki vekkum!"
    ]
  },
  gujarati: {
    ahmedabad: [
      "Ahmedabad ma ek vyapari na beta ae bhagwan ne prarthana kari: 'Bhagwan, mane 100 ma thi 99 marks aapo!' Pitaji ae turant tokya: 'Beta, 1 mark nu pan discount kem aapyu? Pure-pura 100 maangva na!'",
      "Ravivar ni savare Ahmedabad ma ek j dhyey hoi chhe: 'Pehle Fafda Jalebi, pachi bija badha kaamo!' Ane sathe Tarang FM na majedar geeto!",
      "SG Highway par ek car wala bolyo: 'Bhai, traffic ketlu chhe!' Shethji ae hasi ne kidhu: 'Aa traffic nathi bapa, aa to Ahmedabad ni samruddhi chhe!'",
      "Garba season ma Gujarati manas 12 kalak office kare ane 10 kalak garba rame... stamina no koi hisaab j nathi!"
    ],
    generic: [
      "Duniya ma badha vyapar sikhve chhe, pan radio par dil thi bolvu e fakt Tarang RJ j jaane chhe!"
    ]
  },
  punjabi: {
    chandigarh: [
      "Chandigarh de Gedi route te ek munda bullet te horn maar reha si. Dost ne pucheya: 'Bhai horn kyon bajayi jaana ae?' Munda bolya: 'Bhai bullet di aawaz naal Tarang FM da beat synchronize ho reha si!'",
      "Punjabiyan de ghar subah di shuruaat paronthya naal hundi ae, te shaam di shuruaat radio de bhangra beat naal!",
      "Doctor ne mareez nu pucheya: 'Tussi roz kine kilometer walk karde ho?' Punjabi veer has ke bolya: 'Ji walk da pata nahi, par Tribune chowk ton Sector 17 tak gedi roz laayi di ae!'",
      "Sukhna Lake te hawa aini thandi chal rahi si ki dost kehnda: 'Bhai aivein lagda hai shimla Chandigarh vich hi shift ho gaya!'"
    ],
    generic: [
      "Zindagi vich dukh aawan ya khushi, par Tarang Radio te energetic beat kade rukni nahi chahidi!"
    ]
  },
  english: {
    generic: [
      "Why did the software developer in our city always carry an umbrella? Because everything is in the cloud, but nobody remembers to debug the forecast!",
      "I asked the traffic signal how it was doing today. It said: 'Don't even ask! The moment I turn green, everybody just leaves me and speeds away!'",
      "A listener called in and asked: 'RJ, what's the secret to waking up energetic on a weekday morning?' I told them: 'Tune in to Tarang Radio, turn the volume to 80%, and let the beats do the cardio!'",
      "Why did the coffee cup file a police report this morning? Because it got mugged right outside the 9 AM Zoom meeting!"
    ]
  }
};

// 4. Open-Meteo Weather Service
export async function fetchLiveCityWeather(lat, lng, cityName) {
  let weatherData = {
    temp: 26,
    humidity: 55,
    windSpeed: 12,
    rainProbability: 15,
    condition: 'Partly Cloudy',
    desc: 'partly cloudy skies with a gentle breeze',
    alert: null,
    isRain: false,
    isCold: false,
    isHot: false,
    isRealTime: false
  };

  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const weatherRes = await fetch(weatherUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (weatherRes.ok) {
      const json = await weatherRes.json();
      const current = json.current || {};
      const code = current.weather_code ?? 1;

      let condition = 'Partly Cloudy';
      let desc = 'partly cloudy skies with a refreshing breeze';
      let isRain = false;
      let isCold = false;
      let isHot = false;
      let alert = null;

      if (code === 0) {
        condition = 'Clear Blue Skies';
        desc = 'glorious sunshine with clear blue skies';
      } else if ([1, 2, 3].includes(code)) {
        condition = 'Partly Cloudy';
        desc = 'pleasant partly cloudy skies with a soothing breeze';
      } else if ([45, 48].includes(code)) {
        condition = 'Misty Fog';
        desc = 'atmospheric cool misty morning fog';
        isCold = true;
      } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
        condition = 'Rain Showers';
        desc = 'refreshing monsoon showers and raindrops';
        isRain = true;
        alert = 'Rain alert: Keep an umbrella handy and drive cautiously on wet roads!';
      } else if ([95, 96, 99].includes(code)) {
        condition = 'Thunderstorm';
        desc = 'electric rolling thunderclouds and rain showers';
        isRain = true;
        alert = 'Thunderstorm warning: Stay safe indoors and enjoy the tunes on Tarang Radio!';
      }

      const temp = Math.round(current.temperature_2m ?? 26);
      const humidity = Math.round(current.relative_humidity_2m ?? 55);
      const windSpeed = Math.round(current.wind_speed_10m ?? 12);

      if (temp <= 19) isCold = true;
      if (temp >= 33) {
        isHot = true;
        alert = alert || 'Warm day advisory: Stay hydrated and keep cool!';
      }

      const rainProbability = isRain ? 85 : (humidity > 70 ? 45 : 15);

      weatherData = {
        temp,
        humidity,
        windSpeed,
        rainProbability,
        condition,
        desc,
        alert,
        isRain,
        isCold,
        isHot,
        isRealTime: true
      };
    }
  } catch (err) {
    console.warn(`Weather API lookup for ${cityName} timed out or fell back:`, err.message);
  }

  return weatherData;
}

// 5. Time of Day Determination
export function getTimeOfDayContext(date = new Date()) {
  const hours = date.getHours();
  if (hours >= 4 && hours < 12) return { timeOfDay: 'morning', label: 'Morning' };
  if (hours >= 12 && hours < 16) return { timeOfDay: 'afternoon', label: 'Afternoon' };
  if (hours >= 16 && hours < 21) return { timeOfDay: 'evening', label: 'Evening' };
  return { timeOfDay: 'night', label: 'Late Night' };
}

// 6. Multilingual Studio FM Script Generator (Follows 5-step sequence precisely)
export function generateStudioBroadcastScript({
  cityProfile,
  weather,
  languageKey = 'kannada',
  timeContext,
  prevSongTitle = '',
  nextSong
}) {
  const langConfig = SUPPORTED_LANGUAGES[languageKey] || SUPPORTED_LANGUAGES.english;
  const cityName = cityProfile.name;
  const rjName = cityProfile.rj;
  const freq = cityProfile.frequency;
  const corridors = cityProfile.trafficCorridors;
  const randomCorridor = corridors[Math.floor(Math.random() * corridors.length)];

  // Pick joke
  const cityJokes = (MULTILINGUAL_JOKES[languageKey] && MULTILINGUAL_JOKES[languageKey][cityProfile.name.toLowerCase()])
    || (MULTILINGUAL_JOKES[languageKey] && MULTILINGUAL_JOKES[languageKey].generic)
    || MULTILINGUAL_JOKES.english.generic;
  const selectedJoke = cityJokes[Math.floor(Math.random() * cityJokes.length)];

  let step1_greeting = '';
  let step2_weather = '';
  let step3_traffic = '';
  let step4_joke = '';
  let step5_songIntro = '';

  const tempStr = `${weather.temp} degrees Celsius`;

  switch (languageKey) {
    case 'kannada':
      step1_greeting = `Namaskara ${cityName}! ${prevSongTitle ? `Aha, wonderful melody mugiyithu.` : `Hope you're having a fantastic time!`} This is your host ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Namma ${cityName} weather nodidre, right now mercury is at ${tempStr} with ${weather.desc}. ${weather.isRain ? 'Malle bartha ide, so don’t forget your umbrella if you are heading out!' : 'Weather tumba pleasant aagide, enjoy maadi!'}`;
      step3_traffic = `One quick local commute check: ${randomCorridor.road} hattira ${randomCorridor.status.toLowerCase()}. So smooth aagi drive maadi, no tension!`;
      step4_joke = `Ivatthina special comedy break: ${selectedJoke}`;
      step5_songIntro = `Ha ha! Nage mugiyithu, eega mood refresh maado time! Next track up is the sensational '${nextSong.title}' by ${nextSong.artist}. Turn up the volume and feel the rhythm on Tarang Radio!`;
      break;

    case 'telugu':
      step1_greeting = `Namaskaram ${cityName}! ${prevSongTitle ? `Chala andamaina song complete aindi.` : `Andaru ela unnaru?`} This is your energetic host ${rjName} live on Tarang FM ${freq}!`;
      step2_weather = `Mana ${cityName} lo live weather update chusthe, temperature around ${tempStr} ga undi, with ${weather.desc}. ${weather.isRain ? 'Chinukulu paduthunnayi, travel chesetappudu jagratha!' : 'Climatic conditions chala bagunnayi!'}`;
      step3_traffic = `City traffic update: ${randomCorridor.road} daggara ${randomCorridor.status.toLowerCase()}. Plan your journey calmly!`;
      step4_joke = `Ika manam navvukune samayam: ${selectedJoke}`;
      step5_songIntro = `Super ga navvukunnam kada! Now let's dive straight into music. Here is the fantastic track '${nextSong.title}' performed by ${nextSong.artist}. Enjoy the musical journey on Tarang FM!`;
      break;

    case 'tamil':
      step1_greeting = `Vanakkam ${cityName}! ${prevSongTitle ? `Enna oru arumaiyana paattu!` : `Eppadi irukkeenga elarum?`} This is your friendly presenter ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Namma ${cityName} weather paatheenga na, ippo temperature ${tempStr}-la irukku with ${weather.desc}. ${weather.isRain ? 'Mazhai thuligal thooruthu, koda eduthu vechukoonga!' : 'Vaanilai romba pleasant-a irukku!'}`;
      step3_traffic = `Quick road report: ${randomCorridor.road} pakkam ${randomCorridor.status.toLowerCase()}. Safe-a drive pannunga!`;
      step4_joke = `Ippo oru jolly-ana local comedy timing: ${selectedJoke}`;
      step5_songIntro = `Semma sirippu! Ippo let's get back to soulful music. Up next is the fabulous '${nextSong.title}' by ${nextSong.artist}. Volume yethunga, enjoy pannunga Tarang Radio-la!`;
      break;

    case 'hindi':
      step1_greeting = `Namaste ${cityName}! ${prevSongTitle ? `Kya khoobsurat dhun thi!` : `Kaise hain aap sab?`} Main hoon aapka host ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Apne ${cityName} ke mausam ka haal: abhi taapmaan hai lagbhag ${tempStr} under ${weather.desc}. ${weather.isRain ? 'Halki barsaat shuru ho chuki hai, to umbrella sath rakhna mat bhooliye!' : 'Mausam ka mizaaj kaafi suhana aur energetic bana hua hai!'}`;
      step3_traffic = `Raston ki baat karein to: ${randomCorridor.road} ke paas ${randomCorridor.status.toLowerCase()}. Aram se drive kijiye aur safe rahiye!`;
      step4_joke = `Ab thodi hasi aur maze ki baat: ${selectedJoke}`;
      step5_songIntro = `Umeed hai is joke ne aapka mood fresh kar diya hoga! Ab chaliye aage badhte hain agle gaane ki taraf. Presenting '${nextSong.title}' by ${nextSong.artist}. Bajiye gaane aur rahiye tuned with Tarang!`;
      break;

    case 'marathi':
      step1_greeting = `Namaskar ${cityName}! ${prevSongTitle ? `Kiti sundar gaana hota!` : `Kase aahat sarva?`} Me aahe tumcha host ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Aplya ${cityName} cha taaza havaamaan: sadhya tapman aahe summare ${tempStr} under ${weather.desc}. ${weather.isRain ? 'Pausache themb padat ahet, chatri sobat theva!' : 'Havaamaan ekdam uttam aani khushgavhaat aahe!'}`;
      step3_traffic = `Rastyavaril traffic update: ${randomCorridor.road} javal ${randomCorridor.status.toLowerCase()}. Shantipoorvak aani surakshit drive kara!`;
      step4_joke = `Aata ek hasyacha dhamaka: ${selectedJoke}`;
      step5_songIntro = `Mast hasu aala na! Aata vahuya pudhchya zabardast ganyabhadde. Up next is '${nextSong.title}' by ${nextSong.artist}. Radio cha awaaz vadhavva aani anand ghya Tarang sobat!`;
      break;

    case 'bengali':
      step1_greeting = `Nomoshkar ${cityName}! ${prevSongTitle ? `Darun ekti gaan shunchhilam!` : `Kemon aachen shobai?`} Ami apnader host ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Aamader ${cityName}-er aabohawa bolchhe: ekhon tapmatra praay ${tempStr} shonge ${weather.desc}. ${weather.isRain ? 'Brishti shuru hoye gechhe, chhati shonge rakhben!' : 'Aabohawa khub-i anondodayok!'}`;
      step3_traffic = `Shahorer traffic update: ${randomCorridor.road}-er kachhe ${randomCorridor.status.toLowerCase()}. Ektu shanti-te drive korben!`;
      step4_joke = `Ebar ek-chilte hashi: ${selectedJoke}`;
      step5_songIntro = `Asha kori apnader mon bhalo hoye gechhe! Ebar chole ashi porer gaan-e. Here is the melodic track '${nextSong.title}' sung by ${nextSong.artist}. Shur-e thakun Tarang Radio-te!`;
      break;

    case 'malayalam':
      step1_greeting = `Namaskaram ${cityName}! ${prevSongTitle ? `Ettavum madhuramulla oru gaanam aanu ippo kettu theernnathu.` : `Sugamaano ellavarkkum?`} This is your lively presenter ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Nammude ${cityName} weather nokkiyaal, temperature around ${tempStr} aanu with ${weather.desc}. ${weather.isRain ? 'Mazha peyyunnu, kudayo koodayo karuthuka!' : 'Nalla manoharamaaya kaalavastha!'}`;
      step3_traffic = `Oru cheriyoru traffic info: ${randomCorridor.road} bhagathu ${randomCorridor.status.toLowerCase()}. Careful aayi drive cheyyuka!`;
      step4_joke = `Innathe comedy chiri: ${selectedJoke}`;
      step5_songIntro = `Chiri koodi aayappol mood super aayi! Iniyum nalla oru paattilekku pokam. Here is the fantastic track '${nextSong.title}' by ${nextSong.artist}. Enjoy every beat on Tarang Radio!`;
      break;

    case 'gujarati':
      step1_greeting = `Kem chho ${cityName}! ${prevSongTitle ? `Khub j saras geet puru thayu.` : `Majama chho badha?`} Hu chhu tamaro host ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Aapna ${cityName} nu live weather: tapman chhe lagbhag ${tempStr} sathe ${weather.desc}. ${weather.isRain ? 'Varsad ni hel chhe, chhatri sathe rakhjo!' : 'Vatavaran khub j anandmay chhe!'}`;
      step3_traffic = `Traffic samachar: ${randomCorridor.road} pase ${randomCorridor.status.toLowerCase()}. Dhyan thi drive karjo!`;
      step4_joke = `Have ek hasya no dhamako: ${selectedJoke}`;
      step5_songIntro = `Majaa aavi ne! Have aagal vadhiye sangit taraf. Here is the melodious '${nextSong.title}' by ${nextSong.artist}. Surila geeto no aanand lo Tarang Radio par!`;
      break;

    case 'punjabi':
      step1_greeting = `Sat Sri Akal ${cityName}! ${prevSongTitle ? `Ki baat ae, kamaal da geet si!` : `Ki haal chaal ne saareyan de?`} Main haan tuhada host ${rjName} live on Tarang Radio ${freq}!`;
      step2_weather = `Apne ${cityName} da mausam: taapmaan hai lagbhag ${tempStr} te ${weather.desc}. ${weather.isRain ? 'Halki baarish chal rahi hai, sambhal ke chalna!' : 'Mausam poora energetic te khushgawar hai!'}`;
      step3_traffic = `Saddiyan sadkaan da haal: ${randomCorridor.road} de kol ${randomCorridor.status.toLowerCase()}. Aaram naal gaddi chalao!`;
      step4_joke = `Hun thodi hasi te thahake: ${selectedJoke}`;
      step5_songIntro = `Kiddan laga joke! Hun aajo dil nu jhoomne laan wale agle geet te. Lined up for you is '${nextSong.title}' by ${nextSong.artist}. Full volume karo te bhangra pao with Tarang Radio!`;
      break;

    case 'english':
    default:
      step1_greeting = `Good ${timeContext.timeOfDay}, ${cityName}! ${prevSongTitle ? `What a timeless track that was!` : `Hope you're tuned in and feeling fabulous today!`} This is your RJ ${rjName} broadcasting live across ${freq} on Tarang Radio!`;
      step2_weather = `Taking a quick peek outside our studio: the thermometer is reading ${tempStr} in ${cityName} with ${weather.desc}, and humidity around ${weather.humidity} percent. ${weather.isRain ? 'Do carry an umbrella if you are stepping out!' : 'The vibe outside is absolutely stellar!'}`;
      step3_traffic = `Here is your commuter pulse update: traffic along ${randomCorridor.road} is currently showing ${randomCorridor.status.toLowerCase()}. So keep a safe distance, stay patient, and let our radio tunes keep you company!`;
      step4_joke = `Now, time for your daily comedic break: ${selectedJoke}`;
      step5_songIntro = `Hope that brought a smile to your face! Now let's keep the energy flowing with our next feature presentation. Here is '${nextSong.title}' by ${nextSong.artist}. Turn up the speakers and enjoy on Tarang Radio!`;
      break;
  }

  const fullScript = `${step1_greeting} ${step2_weather} ${step3_traffic} ${step4_joke} ${step5_songIntro}`;

  return {
    step1_greeting,
    step2_weather,
    step3_traffic,
    step4_joke,
    step5_songIntro,
    fullScript,
    selectedJoke
  };
}

// 7. OpenAI Intelligent FM Presenter Generator
export async function generateOpenAiBroadcastScript({
  cityProfile,
  weather,
  languageKey,
  timeContext,
  prevSongTitle,
  nextSong
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const langConfig = SUPPORTED_LANGUAGES[languageKey] || SUPPORTED_LANGUAGES.english;
  const corridors = cityProfile.trafficCorridors.map(c => `${c.road} (${c.status})`).join('; ');

  const systemPrompt = `You are an intelligent, entertaining, multilingual FM Radio Jockey broadcasting to listeners across India on Tarang Radio.
Your personality is: energetic, friendly, funny, interactive, positive, natural and professional.
You are NOT a robotic news reader. You speak naturally like a real local radio presenter with conversational expressions, warmth and cultural humour.

Broadcasting Sequence Rules (Must strictly adhere to this 5-step order):
1. Song completion greeting: Greet audience warmly (${timeContext.label} greeting), acknowledge the moment.
2. Weather announcement: Explain the current real weather naturally like an FM presenter (${weather.temp}°C, ${weather.condition}, ${weather.humidity}% humidity, rain probability ${weather.rainProbability}%). Never invent numbers.
3. Traffic updates: Report real traffic conditions for ${cityProfile.name} based on corridors: ${corridors}. Friendly commuter advice. Never invent accidents.
4. Local joke and entertainment: Tell a genuinely funny, clean, light-hearted comedian joke tailored to ${cityProfile.name}'s lifestyle, IT/commute/food/cultural quirks.
5. Introduce the next song: Smooth segue introducing '${nextSong.title}' by ${nextSong.artist} (${nextSong.genre}).

Language: ${langConfig.name} (${langConfig.native}).
CRITICAL: Do not translate English announcements word for word. Speak naturally in ${langConfig.name} using conversational phrasing and local flavour!

Return ONLY valid JSON matching this schema:
{
  "step1_greeting": "string",
  "step2_weather": "string",
  "step3_traffic": "string",
  "step4_joke": "string",
  "step5_songIntro": "string",
  "fullScript": "string"
}`;

  const userPrompt = `City: ${cityProfile.name}, State: ${cityProfile.state}, Country: ${cityProfile.country}.
Local time: ${timeContext.label} (${new Date().toLocaleTimeString('en-IN')}).
Target Language: ${langConfig.name}.
RJ Name: ${cityProfile.rj}, Frequency: ${cityProfile.frequency}.
Previous Song (if any): ${prevSongTitle || 'Recent broadcast track'}.
Next Song to Introduce: "${nextSong.title}" by ${nextSong.artist} (${nextSong.genre}).
Real Weather: ${weather.temp}°C, ${weather.condition}, humidity ${weather.humidity}%, rain prob ${weather.rainProbability}%.
Generate the dynamic FM broadcast JSON now.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 800
    }),
    signal: controller.signal
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const errMsg = errorBody.error?.message || `OpenAI HTTP error ${res.status}`;
    throw new Error(errMsg);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('No content from OpenAI');

  const parsed = JSON.parse(content);
  return {
    step1_greeting: parsed.step1_greeting || '',
    step2_weather: parsed.step2_weather || '',
    step3_traffic: parsed.step3_traffic || '',
    step4_joke: parsed.step4_joke || '',
    step5_songIntro: parsed.step5_songIntro || '',
    fullScript: parsed.fullScript || `${parsed.step1_greeting} ${parsed.step2_weather} ${parsed.step3_traffic} ${parsed.step4_joke} ${parsed.step5_songIntro}`
  };
}

// 8. Router Definition
export function createAiRjRouter() {
  const router = express.Router();

  // GET /api/v1/ai-rj/languages
  router.get('/languages', (req, res) => {
    res.json({
      success: true,
      languages: Object.entries(SUPPORTED_LANGUAGES).map(([key, item]) => ({
        key,
        name: item.name,
        native: item.native,
        flag: item.flag,
        code: item.code
      }))
    });
  });

  // GET /api/v1/ai-rj/daily-show
  // Primary endpoint for on-air broadcast after a song finishes or upon manual trigger
  router.get('/daily-show', async (req, res) => {
    const cityKey = (req.query.city || 'bengaluru').toLowerCase();
    const cityProfile = CITY_PROFILES[cityKey] || CITY_PROFILES.bengaluru;

    // Language resolution: requested language or default language of city
    let requestedLang = (req.query.lang || cityProfile.defaultLanguage || 'kannada').toLowerCase();
    if (!SUPPORTED_LANGUAGES[requestedLang]) {
      requestedLang = cityProfile.defaultLanguage || 'english';
    }

    const prevSong = req.query.prevSong || '';
    const nextSongTitle = req.query.nextSongTitle;
    const nextSongArtist = req.query.nextSongArtist;

    const nextSong = (nextSongTitle && nextSongArtist)
      ? { title: nextSongTitle, artist: nextSongArtist, audioUrl: req.query.nextSongUrl || cityProfile.song.audioUrl, genre: req.query.nextSongGenre || cityProfile.song.genre }
      : cityProfile.song;

    const timeContext = getTimeOfDayContext();

    // 1. Fetch real-time live weather
    const weather = await fetchLiveCityWeather(cityProfile.lat, cityProfile.lng, cityProfile.name);

    // 2. Generate broadcast script (OpenAI first if available, graceful fallback to Native Studio Engine)
    let sequence = null;
    let provider = 'studio-engine';
    let quotaExhaustedNote = null;

    if (process.env.OPENAI_API_KEY) {
      try {
        sequence = await generateOpenAiBroadcastScript({
          cityProfile,
          weather,
          languageKey: requestedLang,
          timeContext,
          prevSongTitle: prevSong,
          nextSong
        });
        provider = 'openai';
      } catch (openAiErr) {
        console.warn('OpenAI broadcast script generation fell back to studio engine:', openAiErr.message);
        if (openAiErr.message.includes('quota') || openAiErr.message.includes('credit')) {
          quotaExhaustedNote = 'OpenAI API key detected with zero remaining billing credits. Seamlessly switched to High-Fidelity Studio FM Engine!';
        }
      }
    }

    if (!sequence) {
      sequence = generateStudioBroadcastScript({
        cityProfile,
        weather,
        languageKey: requestedLang,
        timeContext,
        prevSongTitle: prevSong,
        nextSong
      });
      provider = 'studio-engine';
    }

    res.json({
      success: true,
      provider,
      quotaExhaustedNote,
      city: cityProfile.name,
      cityKey,
      state: cityProfile.state,
      country: cityProfile.country,
      language: requestedLang,
      languageLabel: `${SUPPORTED_LANGUAGES[requestedLang].native} (${SUPPORTED_LANGUAGES[requestedLang].name})`,
      speechVoiceCode: SUPPORTED_LANGUAGES[requestedLang].code,
      timeOfDay: timeContext.timeOfDay,
      timeLabel: timeContext.label,
      rjName: cityProfile.rj,
      frequency: cityProfile.frequency,
      culture: cityProfile.culture,
      weather,
      trafficCorridors: cityProfile.trafficCorridors,
      sequence: {
        step1_greeting: sequence.step1_greeting,
        step2_weather: sequence.step2_weather,
        step3_traffic: sequence.step3_traffic,
        step4_joke: sequence.step4_joke,
        step5_songIntro: sequence.step5_songIntro
      },
      // Backward compatibility fields
      newsTopic: `City Commute & Corridor Pulse: ${cityProfile.trafficCorridors[0].road} - ${cityProfile.trafficCorridors[0].status}`,
      jokes: [sequence.step4_joke],
      weatherSegue: sequence.step2_weather,
      greeting: sequence.step1_greeting,
      fullScript: sequence.fullScript,
      recommendedSong: nextSong,
      generatedAt: new Date().toISOString()
    });
  });

  return router;
}
