import { hash } from "bcryptjs";
import { db } from "./index";
import { users, properties, workOrders, subscriptions } from "./schema";
import { nanoid } from "nanoid";
import { UserRole, PropertyType } from "../types";

async function main() {
  try {
    // Create demo users
    const demoUsers = [
      {
        id: nanoid(),
        email: "admin@propertypro.com",
        name: "Admin User",
        password: await hash("admin123", 10),
        role: UserRole.SUPER_ADMIN,
      },
      {
        id: nanoid(),
        email: "owner@propertypro.com",
        name: "John Owner",
        password: await hash("owner123", 10),
        role: UserRole.OWNER,
      },
      {
        id: nanoid(),
        email: "tenant@propertypro.com",
        name: "Alice Tenant",
        password: await hash("tenant123", 10),
        role: UserRole.TENANT,
      },
      {
        id: nanoid(),
        email: "maintenance@propertypro.com",
        name: "Bob Maintenance",
        password: await hash("maintenance123", 10),
        role: UserRole.MAINTENANCE,
      },
    ];

    console.log("Seeding users...");
    for (const user of demoUsers) {
      await db.insert(users).values(user);
    }

    // Create demo properties
    const demoProperties = [
      {
        id: nanoid(),
        title: "Luxury Downtown Apartment",
        description: "Modern 2-bed apartment with city views",
        type: PropertyType.RENTAL,
        price: 2500,
        address: "123 Main St, New York, NY",
        size: 1200,
        bedrooms: 2,
        bathrooms: 2,
        amenities: JSON.stringify(["Pool", "Gym", "Parking"]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
        ]),
        published: true,
        ownerId: demoUsers[1].id,
        tenantId: demoUsers[2].id,
      },
      {
        id: nanoid(),
        title: "Suburban Family Home",
        description: "Spacious 4-bed house with garden",
        type: PropertyType.SALE,
        price: 750000,
        address: "456 Oak Ave, Los Angeles, CA",
        size: 2800,
        bedrooms: 4,
        bathrooms: 3,
        amenities: JSON.stringify(["Garden", "Garage", "Fireplace"]),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
        ]),
        published: true,
        ownerId: demoUsers[1].id,
      },
    ];

    console.log("Seeding properties...");
    for (const property of demoProperties) {
      await db.insert(properties).values(property);
    }

    // Create demo work orders
    const demoWorkOrders = [
      {
        id: nanoid(),
        title: "Fix Leaking Faucet",
        description: "Kitchen sink faucet is leaking",
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        propertyId: demoProperties[0].id,
        staffId: demoUsers[3].id,
      },
      {
        id: nanoid(),
        title: "AC Maintenance",
        description: "Annual AC system check",
        status: "PENDING",
        priority: "LOW",
        propertyId: demoProperties[0].id,
        staffId: demoUsers[3].id,
      },
    ];

    console.log("Seeding work orders...");
    for (const workOrder of demoWorkOrders) {
      await db.insert(workOrders).values(workOrder);
    }

    // Create demo subscription
    const demoSubscription = {
      id: nanoid(),
      userId: demoUsers[1].id,
      tier: "PRO",
      startDate: Math.floor(Date.now() / 1000),
      endDate: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
      active: true,
    };

    console.log("Seeding subscriptions...");
    await db.insert(subscriptions).values(demoSubscription);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

main();