// Path consistency: Using /assets/images/ for all profile pictures
const BASE_PATH = "/assets/images/";

export const mockCurrentUser = {
    username: "lewish_dev",
    name: "Lewis Hamilton",
    avatarSrc: `${BASE_PATH}pic3.png`, 
};

export const mockSuggestions = [
    {
        id: 1,
        username: "imkirtichadha",
        name: "Kirti Chadha",
        avatarSrc: `${BASE_PATH}pic2.png`,
        followedBy: null, 
    },
    {
        id: 2,
        username: "organic__algorithm",
        name: "Organic Algorithm",
        avatarSrc: `${BASE_PATH}pic4.png`,
        followedBy: "chirag_singla17", 
    },
    {
        id: 3,
        username: "im__grohit",
        name: "Rohit G.",
        avatarSrc: `${BASE_PATH}pic3.png`,
        followedBy: "chirag_singla17",
    },
    {
        id: 4,
        username: "saurabh952",
        name: "Saurabh",
        avatarSrc: `${BASE_PATH}pic5.png`,
        followedBy: "coding_wiz",
    },
    {
        id: 5,
        username: "sarthakbrl",
        name: "Sarthak B.",
        avatarSrc: `${BASE_PATH}pic7.png`,
        followedBy: "3 others",
    },
];
