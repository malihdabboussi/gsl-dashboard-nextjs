import { Entity } from "./types";

const rootUrl = "https://172.232.219.53/api/v2";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function getAllSuppliers(
  collection: "all" | "top" | "first-time" | "repeat" = "all",
) {
  const endpoint = "/Supplier/getAllSupplier";
  const res = await fetch(rootUrl + endpoint);
  console.log(res);
  const result = await res.json();

  console.log(result);

  const suppliers: Entity[] = result.map((s: any) => {
    const supplier: Entity = {
      id: s.id,
      name: s.name,
      email: s.email,
      phone: s.phone.toString(),
      total: s.total ?? 0,
      balance: s.balance ?? 0,
      created: s.created_at,
      creditLimitDuration: [new Date(s.from_date), new Date(s.to_date)],
      billingInfo: {
        address: {
          country: s.country,
          lines: [s.addressLine1, s.addressLine2],
          town: s.town,
          postalCode: s.postalCode,
        },
        phone: {
          country: {
            code: s.phoneNumber?.country.code,
            id: s.phoneNumber?.country.id,
          },
          phoneNumber: s.phoneNumber?.number,
        },
      },
    };

    return supplier;
  });

  console.log(suppliers);

  return suppliers;
}

export async function getAllCustomers(
  collection: "all" | "top" | "first-time" | "repeat" = "all",
) {
  const endpoint = "/Customer/getAllCustomer";
  const res = await fetch(rootUrl + endpoint);
  const result = await res.json();

  console.log(result);

  /* 
  {
    id: 1,
    name: 'Adam',
    email: 'adam@gmail.com',
    phone: '70316651',
    total: null,
    balance: null,
    from_date: '2024-02-11T00:00:00.000Z',
    to_date: '2024-08-11T00:00:00.000Z',
    country: null,
    addressLine1: null,
    town: null,
    postalCode: null,
    zip_code: '1',
    phoneNumber: null,
    zipCode: null,
    created_at: '2024-08-09T10:35:55.731Z',
    updated_at: '2024-08-09T10:35:55.731Z'
  }
  */

  const customers: Entity[] = result.map((c: any) => {
    const customer: Entity = {
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phoneNumber.country.code + c.phoneNumber.number,
      total: c.total ?? 0,
      balance: c.balance ?? 0,
      created: c.created_at,
      creditLimitDuration: [new Date(c.from_date), new Date(c.to_date)],
      billingInfo: {
        address: {
          country: c.country,
          lines: [c.addressLine1, c.addressLine2],
          town: c.town,
          postalCode: c.postalCode,
        },
        phone: {
          country: {
            code: c.phoneNumber?.country.code,
            id: c.phoneNumber?.country.id,
          },
          phoneNumber: c.phoneNumber?.number,
        },
      },
    };

    return customer;
  });

  console.log(customers);

  return customers;
}

export async function createCustomer(data: Entity) {
  console.log(data);

  const customer = {
    name: data.name,
    email: data.email,
    total: data.total,
    balance: data.balance,
    from_date: data.creditLimitDuration
      ? data.creditLimitDuration[0].toDateString()
      : null,
    to_date: data.creditLimitDuration
      ? data.creditLimitDuration[1].toDateString()
      : null,
    country: data.billingInfo?.address.country,
    addressLine1: data.billingInfo?.address.lines[0],
    addressLine2: data.billingInfo?.address.lines[1],
    town: data.billingInfo?.address.town,
    postalCode: data.billingInfo?.address.postalCode,
    phoneNumber: data.billingInfo?.phone,
  };

  const endpoint = "/Customer/AddCustomer";
  const res = await fetch(rootUrl + endpoint, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  console.log(JSON.stringify(customer));
  console.log(res);
}
