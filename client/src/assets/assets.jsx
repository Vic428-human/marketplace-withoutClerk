import logo from './logo.png';
import { Youtube, Instagram, Music2, Facebook, Twitter, Linkedin, Pin, Camera, Gamepad2, MessageCircle } from 'lucide-react';
import bannerFrame from './banner-frame.png';
import emblem from './emblem.png';
import emblem02 from './emblem02.png';
import emblem03 from './emblem03.png';
import emblem04 from './emblem04.png';
import emblem05 from './emblem05.png';
import emblem06 from './emblem06.png';
import emblem07 from './emblem07.png';
import emblem08 from './emblem08.png';

import user_profile from './user_profile.png';
import avatar01 from './avatar01.png';
import avatar02 from './avatar02.png';
import avatar03 from './avatar03.png';

export const assets = {
    logo,
    user_profile,
    avatar01,
    avatar02,
    avatar03,
    bannerFrame,
    emblem,
    emblem02,
    emblem03,
    emblem04,
    emblem05,
    emblem06,
    emblem07,
    emblem08,
};

export const socialMediaLinks = {
    youtube: 'https://www.youtube.com',
    instagram: 'https://www.instagram.com',
    tiktok: 'https://www.tiktok.com',
    facebook: 'https://www.facebook.com',
    twitter: 'https://www.twitter.com',
    linkedin: 'https://www.linkedin.com/in',
    pinterest: 'https://www.pinterest.com',
    snapchat: 'https://www.snapchat.com/add',
    twitch: 'https://www.twitch.tv',
    discord: 'https://discord.com/users',
};

export function getProfileLink(platform, username) {
    if (!platform || !username) return null;
    const key = platform.toLowerCase();
    const base = socialMediaLinks[key];
    if (!base) return null;
    const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
    switch (key) {
        case 'linkedin':
            return `${base}/${cleanUsername}`;
        case 'youtube':
            return `https://www.youtube.com/@${cleanUsername}`;
        case 'snapchat':
            return `${base}/${cleanUsername}`;
        case 'discord':
            return `${base}/${cleanUsername}`;
        default:
            return `${base}/${cleanUsername}`;
    }
}

export const platformIcons = {
    youtube: <Youtube color='#FF0000' className='bg-[#FF000010] size-10 p-2 rounded' />,
    instagram: <Instagram color='#E1306C' className='bg-[#E1306C10] size-10 p-2 rounded' />,
    tiktok: <Music2 color='#000000' className='bg-[#00000010] size-10 p-2 rounded' />,
    facebook: <Facebook color='#1877F2' className='bg-[#1877F210] size-10 p-2 rounded' />,
    twitter: <Twitter color='#1DA1F2' className='bg-[#1DA1F210] size-10 p-2 rounded' />,
    linkedin: <Linkedin color='#0077B5' className='bg-[#0077B510] size-10 p-2 rounded' />,
    pinterest: <Pin color='#E60023' className='bg-[#E6002310] size-10 p-2 rounded' />,
    snapchat: <Camera color='#FFFC00' className='bg-[#FFFC0010] size-10 p-2 rounded' />,
    twitch: <Gamepad2 color='#9146FF' className='bg-[#9146FF10] size-10 p-2 rounded' />,
    discord: <MessageCircle color='#5865F2' className='bg-[#5865F210] size-10 p-2 rounded' />,
};

export const dummyUsers = [
    {
        id: 'user_1',
        email: 'creator1@example.com',
        name: 'Alex Johnson',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
    {
        id: 'user_2',
        email: 'creator2@example.com',
        name: 'Sophia Lee',
        image: 'https://randomuser.me/api/portraits/women/45.jpg',
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
    {
        id: 'user_3',
        email: 'creator3@example.com',
        name: 'David Kim',
        image: 'https://randomuser.me/api/portraits/men/72.jpg',
        createdAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
        updatedAt: 'Thu Oct 16 2025 12:52:10 GMT+0530 (India Standard Time)',
    },
];

export const dummyListings = [
     {
        id: 4,
        ownerId: 'user_4',
        title: '+9殲滅隊鎧甲',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 24,
        monthly_views: 850000,
        price: 66666,
        description: '有3個，要買要快~',
        verified: false,
        country: 'Taiwan',
        featured: false,
        createdAt: '2026-01-08',
        updatedAt: '2026-01-16',
    },
    {
        id: 1,
        ownerId: 'user_1',
        title: '(服飾)太陽神頭盔',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 1,
        monthly_views: 850000,
        price: 45000,
        description: '直購價如題，可議價，可以在遊戲內私我，ID:琴橋緊招，通常平日晚上8點過後會在。',
        verified: true,
        country: 'Taiwan',
        featured: false,
        createdAt: '2026-01-12',
        updatedAt: '2026-01-16',
    },
    {
        id: 2,
        ownerId: 'user_2',
        title: '(服飾)狐狸耳朵',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 5148,
        monthly_views: 25,
        price: 2500,
        description: '可R幣交易',
        verified: true,
        country: 'Taiwan',
        featured: true,
        createdAt: '2026-01-11',
        updatedAt: '2026-01-16',
    },
    {
        id: 3,
        ownerId: 'user_3',
        title: '(服飾)露西法翅膀',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 66,
        monthly_views: 850000,
        price: 1000,
        description: '有3個，要買要快~',
        verified: false,
        country: 'Taiwan',
        featured: false,
        createdAt: '2026-01-08',
        updatedAt: '2026-01-16',
    },
     {
        id: 3,
        ownerId: 'user_3',
        title: '(服飾)露西法翅膀',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 66,
        monthly_views: 850000,
        price: 1000,
        description: '有3個，要買要快~',
        verified: false,
        country: 'Taiwan',
        featured: false,
        createdAt: '2026-01-08',
        updatedAt: '2026-01-16',
    },
     {
        id: 3,
        ownerId: 'user_3',
        title: '(服飾)露西法翅膀',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 66,
        monthly_views: 850000,
        price: 1000,
        description: '有3個，要買要快~',
        verified: false,
        country: 'Taiwan',
        featured: false,
        createdAt: '2026-01-08',
        updatedAt: '2026-01-16',
    },
     {
        id: 3,
        ownerId: 'user_3',
        title: '(服飾)露西法翅膀',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 66,
        monthly_views: 850000,
        price: 1000,
        description: '有3個，要買要快~',
        verified: false,
        country: 'Taiwan',
        featured: false,
        createdAt: '2026-01-08',
        updatedAt: '2026-01-16',
    },
     {
        id: 3,
        ownerId: 'user_3',
        title: '(服飾)露西法翅膀',
        game: '仙境傳說-樂園',
        platform: 'discord',
        username: 'lettuce06881',
        views: 66,
        monthly_views: 850000,
        price: 1000,
        description: '有3個，要買要快~',
        verified: false,
        country: 'Taiwan',
        featured: false,
        createdAt: '2026-01-08',
        updatedAt: '2026-01-16',
    },
   
];

export const dummyMessages = [
    {
        id: 'msg104',
        chatId: 'chat_1',
        sender_id: 'user_1',
        message: 'Hi, is this YouTube channel still available?',
        createdAt: '2025-10-29T09:00:00.000Z',
    },
    {
        id: 'msg105',
        chatId: 'chat_1',
        sender_id: 'user_2',
        message: "Yes, it's still available. Are you interested in buying?",
        createdAt: '2025-10-29T09:02:00.000Z',
    },
    {
        id: 'msg106',
        chatId: 'chat_1',
        sender_id: 'user_1',
        message: 'Can you share recent analytics screenshots?',
        createdAt: '2025-10-29T09:05:00.000Z',
    },
];

export const dummyChats = [
    {
        id: 'chat_1',
        chatUserId: 'user_1',
        ownerUserId: 'user_2',
        listingId: 'listing_1',
        active: true,
        lastMessage: 'Hi, is this YouTube channel still available?',
        isLastMessageRead: false,
        createdAt: '2025-10-28T12:34:56.000Z',
        updatedAt: '2025-10-29T09:10:00.000Z',
        messages: dummyMessages,
        ownerUser: dummyUsers[0],
        chatUser: dummyUsers[1],
        listing: dummyListings[0],
    },
    {
        id: 'chat_2',
        chatUserId: 'user_2',
        ownerUserId: 'user_3',
        listingId: 'listing_2',
        active: true,
        lastMessage: 'Hey, is your Instagram fitness page for sale?',
        isLastMessageRead: true,
        createdAt: '2025-10-28T15:30:00.000Z',
        updatedAt: '2025-10-29T10:00:00.000Z',
        messages: dummyMessages,
        ownerUser: dummyUsers[1],
        chatUser: dummyUsers[2],
        listing: dummyListings[1],
    },
];

export const dummyOrders = [
    {
        id: '37410546-9b88-4917-a396-612e10d1df13',
        listingId: '61cfdc59-b638-49c4-8645-de6f4cfb636f',
        ownerId: 'user_1',
        userId: 'user_2',
        amount: 2500,
        isPaid: true,
        createdAt: '2025-11-07T13:14:56.112Z',
        listing: dummyListings[0],
        credential: {
            id: '3c4a950f-e25b-43c7-b592-36e76215ec2f',
            listingId: '61cfdc59-b638-49c4-8645-de6f4cfb636f',
            originalCredential: [
                { name: 'Email', type: 'email', value: 'user@example.com' },
                { name: 'Password', type: 'password', value: '12345678' },
            ],
            updatedCredential: [
                { name: 'Email', type: 'email', value: 'user@example.com' },
                { name: 'Password', type: 'password', value: '9876543210' },
            ],
            createdAt: '2025-11-07T13:13:08.881Z',
        },
    },
    {
        id: '0bd0ded3-756e-439a-8e81-2e00353cdad5',
        listingId: '339012a0-e32d-432a-be96-961ffcf27c8d',
        ownerId: 'user_1',
        userId: 'user_2',
        amount: 2500,
        isPaid: true,
        createdAt: '2025-11-10T09:00:23.832Z',
        listing: dummyListings[1],
        credential: {
            id: '14c0e94b-6a0f-4017-a277-cbb13a22f9ef',
            listingId: '339012a0-e32d-432a-be96-961ffcf27c8d',
            originalCredential: [
                { name: 'Email', type: 'email', value: 'user1@example.com' },
                { name: 'Password', type: 'password', value: '12121212' },
            ],
            updatedCredential: [
                { name: 'Email', type: 'email', value: 'user1@example.com' },
                { name: 'Password', type: 'password', value: '12345678' },
            ],
            createdAt: '2025-11-10T07:25:43.919Z',
        },
    },
];

export const dummyWithdrawalRequests = [
    {
        id: '79443d65-8dc4-447b-9d27-3a862387fa5a',
        userId: 'user_1',
        amount: 1000,
        account: [
            { name: 'Account Holder Name', type: 'text', value: 'John Doe' },
            { name: 'Bank Name', type: 'text', value: 'Bank Of America' },
            { name: 'Account Number', type: 'number', value: '112233445566' },
            { name: 'Account Type', type: 'text', value: 'Saving' },
            { name: 'SWIFT', type: 'text', value: 'AM9908TY09' },
            { name: 'Branch', type: 'text', value: 'LA' },
        ],
        isWithdrawn: true,
        createdAt: '2025-11-09T06:00:35.759Z',
        updatedAt: '2025-11-09T13:05:26.385Z',
        user: dummyUsers[0],
    },
    {
        id: 'f266e8c3-1d01-4bd3-931b-760cd766d136',
        userId: 'user_2',
        amount: 1000,
        account: [
            { name: 'Account Holder Name', type: 'text', value: 'John Doe' },
            { name: 'Bank Name', type: 'text', value: 'Bank Of America' },
            { name: 'Account Number', type: 'number', value: '112233445566' },
            { name: 'Account Type', type: 'text', value: 'Saving' },
            { name: 'SWIFT', type: 'text', value: 'AM9908TY09' },
            { name: 'Branch', type: 'text', value: 'LA' },
        ],
        isWithdrawn: true,
        createdAt: '2025-11-09T10:07:21.315Z',
        updatedAt: '2025-11-10T06:36:05.468Z',
        user: dummyUsers[1],
    },
];
