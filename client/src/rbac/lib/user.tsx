// pages
import { PlayGame, Leaderboard } from "@pages";

const USER_ROUTES = [
  {
    path: "/user",
    routes: [
      {
        path: "/user/play_game",
        name: "play_game",
        icon: null,
        icon_inactive: null,
        component: PlayGame,
        isSidebarMenu: false,
      },
      {
        path: "/user/leaderboard",
        name: "play_game",
        icon: null,
        icon_inactive: null,
        component: Leaderboard,
        isSidebarMenu: false,
      },
    ],
  },
];

export default USER_ROUTES;
