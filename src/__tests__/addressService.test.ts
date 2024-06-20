import { AddressService } from "../services/AddressService";
import { prisma } from "../prisma/utils/client";

describe("AddressService", () => {
  let addressService: AddressService;
  let spyCreate: jest.SpyInstance;
  let spyUpdate: jest.SpyInstance;
  let spyFindFirst: jest.SpyInstance;

  beforeEach(() => {
    addressService = new AddressService();
    spyCreate = jest.spyOn(prisma.address, "create");
    spyUpdate = jest.spyOn(prisma.address, "update");
    spyFindFirst = jest.spyOn(prisma.address, "findFirst");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should create a new address (create)", async () => {
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

  it("Should throw an error if any required field is missing (create)", async () => {
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

  it("Should must update any field that is needed by id (update)", async () => {
    spyFindFirst.mockReturnValue({
      id: 999999,
      street: "Rua L",
      number: "1234",
      city: "Pelotas",
      state: "RS",
      country: "Brasil",
      zipCode: "00000001",
      createdAt: "2024-06-03T04:51:05.499Z",
      updatedAt: "2024-06-03T04:51:05.499Z",
    });

    spyUpdate.mockReturnValue({
      id: 999999,
      street: "Rua L",
      number: "1234",
      city: "Porto Alegre",
      state: "RS",
      country: "Brasil",
      zipCode: "00000001",
      createdAt: "2024-06-03T04:51:05.499Z",
      updatedAt: "2024-06-03T04:51:05.499Z",
    });

    const addressUpdated = await addressService.update(999999, "Porto Alegre");

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(spyFindFirst).toHaveBeenCalledTimes(1);
    expect(addressUpdated.id).toEqual(999999);
    expect(addressUpdated.city).toEqual("Porto Alegre");
  });

  it("Should throw an error if address not found (update)", async () => {
    const address = {
      id: 9999999999,
      street: "Rua X",
    };

    spyFindFirst.mockImplementation(() => {
      throw new Error("Address not found!");
    });

    try {
      await addressService.update(address.id, address.street);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toEqual("Address not found!");

      expect(spyFindFirst).toHaveBeenCalledTimes(1);
    }
  });

  it("Should throw an error if any required field is missing (update)", async () => {
    const address = {
      id: 999999,
      street: 32,
    };

    spyFindFirst.mockReturnValue({
      id: 999999,
      street: "Rua L",
      number: "1234",
      city: "Pelotas",
      state: "RS",
      country: "Brasil",
      zipCode: "00000001",
      createdAt: "2024-06-03T04:51:05.499Z",
      updatedAt: "2024-06-03T04:51:05.499Z",
    });

    spyUpdate.mockImplementation(() => {
      throw new Error("Invalid input (type expected: String)");
    });

    try {
      // @ts-expect-error simulating the failure to send the field number
      await addressService.update(address.id, address.street);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect((error as Error).message).toEqual(
        "Invalid input (type expected: String)"
      );

      expect(spyFindFirst).toHaveBeenCalledTimes(1);
      expect(spyUpdate).toHaveBeenCalledTimes(1);
    }
  });
});
