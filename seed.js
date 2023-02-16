const mongoose = require('mongoose');
const GeneralChat = require('./models/GeneralChat');
const User = require('./models/User');
const Weapon = require('./models/Weapon');
const db = require('./config/db');

mongoose.connect(db, { useNewUrlParser: true } );
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

const dummyUser = new User({
    username: 'dummy',
    password: 'dummy123',
});


// THIS CAN BE UNCOMMENTED AFTER DUMMY USER HAS BEEN ADDED
// const dummyComment = new GeneralChat({
//     userId: dummyUser.id
//     comment: 'First comment - love the site!'
// })

const weapons = [
    {
        weaponName: 'HAVOC Rifle',
        weaponImg: './weapon_images/HAVOC_Rifle.webp',
        weaponType: 'Assault Rifle',
        stats: {
            ammoType: 'energy',
            dps: 167,
            rpm: 556
        }
    },
    {
        weaponName: 'VK-47 Flatline',
        weaponImg: './weapon_images/VK-47_Flatline.webp',
        weaponType: 'Assault Rifle',
        stats: {
            ammoType: 'heavy',
            dps: 160,
            rpm: 600
        }
    },
    {
        weaponName: 'Hemlok Burst AR',
        weaponImg: './weapon_images/Hemlok_Burst_AR.webp',
        weaponType: 'Assault Rifle',
        stats: {
            ammoType: 'heavy',
            dps: 147,
            rpm: 490
        }
    },
    {
        weaponName: 'R-301 Carbine',
        weaponImg: './weapon_images/R-301_Carbine.webp',
        weaponType: 'Assault Rifle',
        stats: {
            ammoType: 'light',
            dps: 168,
            rpm: 270
        }
    },
    {
        weaponName: 'Alternator SMG',
        weaponImg: './weapon_images/Alternator_SMG.webp',
        weaponType: 'SMG',
        stats: {
            ammoType: 'light',
            dps: 138,
            rpm: 640
        }
    },
    {
        weaponName: 'Prowler Burst PDW',
        weaponImg: './weapon_images/Prowler_Burst_PDW.webp',
        weaponType: 'SMG',
        stats: {
            ammoType: 'heavy',
            dps: 186,
            rpm: 800
        }
    },
    {
        weaponName: 'R-99 SMG',
        weaponImg: './weapon_images/R-99_SMG.webp',
        weaponType: 'SMG',
        stats: {
            ammoType: 'light',
            dps: 216,
            rpm: 1080
        }
    },
    {
        weaponName: 'Volt SMG',
        weaponImg: './weapon_images/Volt_SMG.webp',
        weaponType: 'SMG',
        stats: {
            ammoType: 'energy',
            dps: 225,
            rpm: 597
        }
    },
    {
        weaponName: 'C.A.R. SMG',
        weaponImg: './weapon_images/C.A.R._SMG.webp',
        weaponType: 'SMG',
        stats: {
            ammoType: 'heavy',
            dps: 186,
            rpm: 174
        }
    },
    {
        weaponName: 'Devotion LMG',
        weaponImg: './weapon_images/Devotion_LMG.webp',
        weaponType: 'LMG',
        stats: {
            ammoType: 'energy',
            dps: 255,
            rpm: 900
        }
    },
    {
        weaponName: 'L-STAR EMG',
        weaponImg: './weapon_images/L-STAR_EMG.webp',
        weaponType: 'LMG',
        stats: {
            ammoType: 'energy',
            dps: 130,
            rpm: 658
        }
    },
    {
        weaponName: 'M600 Spitfire',
        weaponImg: './weapon_images/M600_Spitfire.webp',
        weaponType: 'LMG',
        stats: {
            ammoType: 'heavy',
            dps: 170,
            rpm: 512
        }
    },
    {
        weaponName: 'Rampage LMG',
        weaponImg: './weapon_images/Rampage_LMG.webp',
        weaponType: 'LMG',
        stats: {
            ammoType: 'special',
            dps: 126,
            rpm: 198
        }
    },
    {
        weaponName: 'G7 Scout',
        weaponImg: './weapon_images/G7_Scout.webp',
        weaponType: 'Marksman',
        stats: {
            ammoType: 'light',
            dps: 136,
            rpm: 273
        }
    },
    {
        weaponName: 'Triple Take',
        weaponImg: './weapon_images/Triple_Take.webp',
        weaponType: 'Marksman',
        stats: {
            ammoType: 'energy',
            dps: 101,
            rpm: 88
        }
    },
    {
        weaponName: '30-30 Repeater',
        weaponImg: './weapon_images/30-30_Repeater.webp',
        weaponType: 'Marksman',
        stats: {
            ammoType: 'heavy',
            dps: 135,
            rpm: 164
        }
    },
    {
        weaponName: 'Bocek Compound Bow',
        weaponImg: './weapon_images/Bocek_Compound_Bow.webp',
        weaponType: 'Marksman',
        stats: {
            ammoType: 'sniper',
            dps: 110,
            rpm: 165
        }
    },
    {
        weaponName: 'Charge Rifle',
        weaponImg: './weapon_images/Charge_Rifle.webp',
        weaponType: 'Sniper',
        stats: {
            ammoType: 'sniper',
            dps: 95,
            rpm: 180
        }
    },
    {
        weaponName: 'Longbow DMR',
        weaponImg: './weapon_images/Longbow_DMR.webp',
        weaponType: 'Sniper',
        stats: {
            ammoType: 'sniper',
            dps: 78,
            rpm: 86
        }
    },
    {
        weaponName: 'Kraber .50-Cal Sniper',
        weaponImg: './weapon_images/Kraber_.50-Cal_Sniper.webp',
        weaponType: 'Sniper',
        stats: {
            ammoType: 'special',
            dps: 75,
            rpm: 36
        }
    },
    {
        weaponName: 'Sentinel',
        weaponImg: './weapon_images/Sentinel.webp',
        weaponType: 'Sniper',
        stats: {
            ammoType: 'sniper',
            dps: 80,
            rpm: 150
        }
    },
    {
        weaponName: 'EVA-8 Auto',
        weaponImg: './weapon_images/EVA-8_Auto.webp',
        weaponType: 'Shotgun',
        stats: {
            ammoType: 'shotgun',
            dps: 128,
            rpm: 90
        }
    },
    {
        weaponName: 'Mastiff Shotgun',
        weaponImg: './weapon_images/Mastiff_Shotgun.webp',
        weaponType: 'Shotgun',
        stats: {
            ammoType: 'shotgun',
            dps: 96,
            rpm: 288
        }
    },
    {
        weaponName: 'Mozambique Shotgun',
        weaponImg: './weapon_images/Mozambique_Shotgun.webp',
        weaponType: 'Shotgun',
        stats: {
            ammoType: 'shotgun',
            dps: 180,
            rpm: 66
        }
    },
    {
        weaponName: 'Peacekeeper',
        weaponImg: './weapon_images/Peacekeeper.webp',
        weaponType: 'Shotgun',
        stats: {
            ammoType: 'shotgun',
            dps: 58,
            rpm: 150
        }
    },
    {
        weaponName: 'RE-45 Auto',
        weaponImg: './weapon_images/RE-45_Auto.webp',
        weaponType: 'Pistol',
        stats: {
            ammoType: 'light',
            dps: 137,
            rpm: 750
        }
    },
    {
        weaponName: 'P2020',
        weaponImg: './weapon_images/P2020.webp',
        weaponType: 'Pistol',
        stats: {
            ammoType: 'light',
            dps: 86,
            rpm: 430
        }
    },
    {
        weaponName: 'Wingman',
        weaponImg: './weapon_images/Wingman.webp',
        weaponType: 'Pistol',
        stats: {
            ammoType: 'heavy',
            dps: 153,
            rpm: 205
        }
    },
]

