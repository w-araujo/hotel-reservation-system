import { AddressService } from "../services/AddressService";
import { prisma } from "../prisma/utils/client";

describe("AddressService", () => {
  let addressService: AddressService;
  let spyCreate: jest.SpyInstance;

  beforeEach(() => {
    addressService = new AddressService();
    spyCreate = jest.spyOn(prisma.address, "create");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new address", async () => {
    const address = {
      street: "Rua X",
      number: "1234",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      zipCode: "00000000",
    };

    spyCreate.mockReturnValue({
      id: 99999,
      street: "Rua X",
      number: "1234",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      zipCode: "00000000",
      createdAt: "2024-06-20T01:20:54.984Z",
      updatedAt: "2024-06-20T01:20:54.984Z",
    });

    const createAddress = await addressService.create(
      address.street,
      address.number,
      address.city,
      address.state,
      address.country,
      address.zipCode
    );

    expect(spyCreate).toHaveBeenCalledTimes(1);
    expect(createAddress.id).toEqual(99999);
    expect(createAddress.country).toEqual("Brasil");
  });

  it("Should throw an error if any required field is missing", async () => {
    const address = {
      street: "Rua X",
      // Missing "number" field
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      zipCode: "00000000",
    };

    spyCreate.mockImplementation(() => {
      throw new Error(
        "Invalid 'create' operation: Required field 'state' is missing."
      );
    });

    try {
      // @ts-expect-error simulating the failure to send the field number
      await addressService.create(
        address.street,
        address.city,
        address.state,
        address.country,
        address.zipCode
      );
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toEqual(
        "Invalid 'create' operation: Required field 'state' is missing."
      );

      expect(spyCreate).toHaveBeenCalledTimes(1);
    }
  });
});
