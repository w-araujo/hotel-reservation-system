import { GuestService } from "../services/GuestService";
import { prisma } from "../prisma/utils/client";

describe("GuestService", () => {
  let guestService: GuestService;
  let spyCreateGuest: jest.SpyInstance;
  let spyCreateAddress: jest.SpyInstance;

  beforeEach(() => {
    guestService = new GuestService();
    spyCreateGuest = jest.spyOn(prisma.guest, "create");
    spyCreateAddress = jest.spyOn(prisma.address, "create");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new guest (create)", async () => {
    const guest = {
      name: "wesley araujo",
      email: "wes@mail.com",
      birthdate: "2010-09-23",
      phone: "00000000000",
      password: "1234567",
    };

    const address = {
      id: 999,
      street: "Default Street",
      number: "0",
      city: "Default City",
      state: "Default State",
      country: "Default Country",
      zipCode: "00000000",
    };

    const birthdateWithTime = new Date(guest.birthdate);
    birthdateWithTime.setHours(0, 0, 0, 0);

    spyCreateAddress.mockResolvedValue({
      id: 999,
      street: "Default Street",
      number: "0",
      city: "Default City",
      state: "Default State",
      country: "Default Country",
      zipCode: "00000000",
    });

    spyCreateGuest.mockReturnValue({
      id: 99999,
      name: "wesley araujo",
      email: "wes@mail.com",
      birthdate: "2010-09-23T00:00:00.000Z",
      phone: "00000000000",
      createdAt: "2024-06-20T01:20:54.984Z",
      updatedAt: "2024-06-20T01:20:54.984Z",
    });

    const createGuest = await guestService.create(
      guest.name,
      guest.email,
      birthdateWithTime,
      guest.phone,
      guest.password,
      address.id
    );

    expect(spyCreateGuest).toHaveBeenCalledTimes(1);
    expect(spyCreateAddress).toHaveBeenCalledTimes(1);
    expect(createGuest.name).toEqual("wesley araujo");
    expect(createGuest.email).toEqual("wes@mail.com");
  });

  it("Should throw an error if any required field is missing (create)", async () => {
    const guest = {
      name: "Wesley Araujo",
      email: 24,
      birthdate: "2002-09-23",
      phone: "00000000000",
      password: "1234567",
    };

    const address = {
      id: 999,
      street: "Default Street",
      number: "0",
      city: "Default City",
      state: "Default State",
      country: "Default Country",
      zipCode: "00000000",
    };

    const birthdateWithTime = new Date(guest.birthdate);
    birthdateWithTime.setHours(0, 0, 0, 0);

    spyCreateAddress.mockResolvedValue({
      id: 999,
      street: "Default Street",
      number: "0",
      city: "Default City",
      state: "Default State",
      country: "Default Country",
      zipCode: "00000000",
    });

    spyCreateGuest.mockImplementation(() => {
      throw new Error(
        "Prisma error: Invalid value for field 'email': Expected string, received number."
      );
    });

    try {
      await guestService.create(
        guest.name,
        // @ts-expect-error simulating a typing error
        guest.email,
        birthdateWithTime,
        guest.phone,
        guest.password,
        address.id
      );
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toEqual(
        "Prisma error: Invalid value for field 'email': Expected string, received number."
      );

      expect(spyCreateGuest).toHaveBeenCalledTimes(1);
    }
  });
});
