import * as request from "supertest";
import { jest } from "@jest/globals";
import app from "../app";

jest.test("Add drone with correct parametes", async () => {
  await request(app)
    .post("/api/medication")
    .send({
      serialNumber: "1233333333444",
      weightLimit: 500,
      model: "Lightweight",
      batteryCapacity: 100,
      state: "IDLE",
    })
    .expect(201);
});

//test("Get drones list", async () => {});

//["Lightweight", "Middleweight", "Cruiserweight", "Heavyweight"],
//enum: [ "IDLE", "LOADING", "LOADED", "DELIVERING", "DELIVERED", "RETURNING", ],
