import { hashSync, compareSync } from "bcryptjs";

const usersSeeder = (server) => {
  server.db.loadData({
    users: [
      {
        id: 1,
        email: "admin@mail.ru",
        password: hashSync("admin", 8),
      },
    ],
  });
};

export default function seeds(server) {
  // server.loadFixtures();
  usersSeeder(server);
}
