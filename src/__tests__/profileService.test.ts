import { ProfileService } from "../services/ProfileService";
import { prisma } from "../prisma/utils/client";

describe("AddressService", () => {
  let profileService: ProfileService;
  let spyFindMany: jest.SpyInstance;

  beforeEach(() => {
    profileService = new ProfileService();
    spyFindMany = jest.spyOn(prisma.reservation, "findMany");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should be list all reservations", async () => {
    const guest = {
      id: 888,
      name: "wesley araujo",
      email: "wes@mail.com",
    };
    spyFindMany.mockReturnValue([
      {
        id: 88888,
        hotelName: "X",
        roomNumber: 999,
        value: 100,
        date: "2020-05-01",
        startDate: "2020-06-01",
        endDate: "2020-06-02",
        status: "CONFIRMED",
        guest: {
          id: 888,
          name: "wesley araujo",
          email: "wes@mail.com",
        },
      },
      {
        id: 99999,
        hotelName: "X",
        roomNumber: 888,
        value: 200,
        date: "2020-06-01",
        startDate: "2020-07-01",
        endDate: "2020-06-03",
        status: "CONFIRMED",
        guest: {
          id: 888,
          name: "wesley araujo",
          email: "wes@mail.com",
        },
      },
    ]);

    const listReservations = await profileService.selfReservations(guest.id);

    expect(spyFindMany).toHaveBeenCalledTimes(1);
    expect(listReservations.length).toBe(2);
    expect(listReservations[0].hotelName).toEqual("X");
    expect(listReservations[1].status).toEqual("CONFIRMED");
  });
});
