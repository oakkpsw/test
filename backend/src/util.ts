// utils.ts

export function buildUserDataObject(inputData: any): any {

  return {
    name: inputData.name,
    username: inputData.username,
    email: inputData.email,
    phone: inputData.phone,
    website: inputData.website,
    street: inputData.address?.street ?? null,
    suite: inputData.address?.suite ?? null,
    city: inputData.address?.city ?? null,
    zipcode: inputData.address?.zipcode ?? null,
    geo_lat: inputData.address?.geo?.lat ?? null,
    geo_lng: inputData.address?.geo?.lng ?? null,
    company_name: inputData.company?.name ?? null,
    catchPhrase: inputData.company?.catchPhrase ?? null,
    bs: inputData.company?.bs ?? null,
    id: undefined,
    password: inputData.password
  };
}

export function returnUserDataObject(returnData: any): any {
  return {
    id: returnData.id,
    name: returnData.name,
    username: returnData.username,
    email: returnData.email,
    address: {
      street: returnData.street,
      suite: returnData.suite,
      city: returnData.city,
      zipcode: returnData.zipcode,
      geo: {
        lat: returnData.geo_lat,
        lng: returnData.geo_lng,
      },
    },
    phone: returnData.phone,
    website: returnData.website,
    company: {
      name: returnData.company_name,
      catchPhrase: returnData.catchPhrase,
      bs: returnData.bs,
    },
  };
}