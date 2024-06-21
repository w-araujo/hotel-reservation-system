import { prisma } from "./utils/client";
import { connectPrisma, disconnectPrisma } from "./utils/connectDisconnect";

function zeroTime(dateString) {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

async function main() {
  await connectPrisma();

  // Cria alguns hóspedes
  await prisma.guest.create({
    data: {
      name: "wesley araujo",
      email: "wes@mail.com",
      birthdate: zeroTime("2003-01-01T00:00:00.000Z"),
      phone: "55512348765",
      password: "password123",
      role: "ADMIN",
    },
  });

  const guest2 = await prisma.guest.create({
    data: {
      name: "Maria Silva",
      email: "ms@mail.com",
      birthdate: zeroTime("1991-05-15T00:00:00.000Z"),
      phone: "55536789865",
      password: "password456",
    },
  });

  // Cria algumas reservas
  await prisma.reservation.create({
    data: {
      hotelName: "Hotel California",
      roomNumber: "101",
      value: 350.0,
      startDate: zeroTime("2024-07-05T00:00:00.000Z"),
      endDate: zeroTime("2024-07-10T00:00:00.000Z"),
      guestId: guest2.id,
    },
  });

  await prisma.reservation.create({
    data: {
      hotelName: "Hotel California",
      roomNumber: "202",
      value: 100.5,
      startDate: zeroTime("2024-08-01T00:00:00.000Z"),
      endDate: zeroTime("2024-08-03T00:00:00.000Z"),
      guestId: guest2.id,
    },
  });

  console.log("Seeds criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectPrisma();
  });
