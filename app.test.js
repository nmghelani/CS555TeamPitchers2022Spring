const axios = require("axios");
test("Opening home page", async () => {
  const result = await fetchData("http://localhost:3000/");
  expect(result).toBe(true);
});

test("Opening Smash It!", async () => {
  const result = await fetchData("http://localhost:3000/smashit");
  expect(result).toBe(true);
});

test("Opening Aim It!", async () => {
  const result = await fetchData("http://localhost:3000/aimit");
  expect(result).toBe(true);
});

test("Opening Water It!", async () => {
  const result = await fetchData("http://localhost:3000/waterit");
  expect(result).toBe(true);
});

test("Opening Random page!", async () => {
  const result = await fetchData("http://localhost:3000/something");
  expect(result).toBe(false);
});

async function fetchData(route) {
  try {
    const data = await axios.get(route);
    if (data.status == 200) return true;
    else return false;
  } catch (error) {
    return false;
  }
}
