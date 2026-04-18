const MOCK_IMAGE_MAP: Record<string, string> = {
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/070f25482247.jpg",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/07ba15a5d8c4.jpg",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/3ca861f3fb33.jpg",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/44795adb651a.jpg",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/257b11dd0fec.jpg",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/67f5c34daeba.jpg",
  "https://images.unsplash.com/photo-1443884590026-2e4d21aee71c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwc2hvcHxlbnwxfHx8fDE3NzYwODM0MTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/306cc4f0acb8.jpg",
  "https://images.unsplash.com/photo-1567880905822-56f8e06fe630?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjYWZlfGVufDF8fHx8MTc3NjA4MzQyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/f1aa9c158241.jpg",
  "https://images.unsplash.com/photo-1558210598-89ba75b1724e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJ8ZW58MXx8fHwxNzc2MDgzNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/bca9bf3e6d10.jpg",
  "https://images.unsplash.com/photo-1618111415065-c20b4e1afd41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWQlMjBhbmQlMjBicmVha2Zhc3R8ZW58MXx8fHwxNzc2MDgzNDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/868f04a1d217.jpg",
  "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/c502bf5705e0.jpg",
  "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/c454ad8cf97d.jpg",
  "https://images.unsplash.com/photo-1753109818506-2c4c39c16c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400":
    "/mock-images/7ebd8686bee3.jpg",
  "https://images.unsplash.com/photo-1680090966795-06fdd0e7046b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400":
    "/mock-images/42d17a1a41dc.jpg",
  "https://images.unsplash.com/photo-1593903971086-da1ad90da20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400":
    "/mock-images/8dc2714b8b45.jpg",
  "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100":
    "/mock-images/dbb7b544e9c1.jpg",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100":
    "/mock-images/a547d4fa223b.jpg",
  "https://images.unsplash.com/photo-1688148484023-b56a9b91525a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800":
    "/mock-images/98490fee962e.jpg",
  "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100":
    "/mock-images/1fda83eb4cc6.jpg",
  "https://images.unsplash.com/photo-1704354924223-d44ef8283cce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800":
    "/mock-images/c13604978f0f.jpg",
  "https://images.unsplash.com/photo-1617355453845-6996ffeee4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100":
    "/mock-images/4dd54f117564.jpg",
  "https://images.unsplash.com/photo-1622979059365-5952c36686e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800":
    "/mock-images/3ea1a6386cfa.jpg",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800":
    "/mock-images/90a1a6f2353e.jpg",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100":
    "/mock-images/dde219ac95d2.jpg",
  "https://images.unsplash.com/photo-1606757870480-975652100251?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800":
    "/mock-images/635ea71c2cbd.jpg",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100":
    "/mock-images/ee58bd9c6ac8.jpg",
  "https://images.unsplash.com/photo-1571217748526-261477b6ac62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800":
    "/mock-images/b4d5dda13283.jpg",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80":
    "/mock-images/c561cd48f545.jpg",
  "https://images.unsplash.com/photo-1516483638261-f40af5aa3228?auto=format&fit=crop&w=800&q=80":
    "/mock-images/67f5c34daeba.jpg",
  "https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&w=800&q=80":
    "/mock-images/306cc4f0acb8.jpg",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80":
    "/mock-images/3ca861f3fb33.jpg",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80":
    "/mock-images/070f25482247.jpg",
  "https://images.unsplash.com/photo-1595918989407-ae09b2f222bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGdpcmwlMjBjdXRlfGVufDF8fHx8MTc3NjEzMjE3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/1fda83eb4cc6.jpg",
  "https://images.unsplash.com/photo-1597657399260-79eedfca3c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwY2FmZXxlbnwxfHx8fDE3NzYxMzIxNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/f1aa9c158241.jpg",
  "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2MTMyMTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/a547d4fa223b.jpg",
  "https://images.unsplash.com/photo-1696449241254-11cf7f18ce32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzc2MTMyMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/bca9bf3e6d10.jpg",
  "https://images.unsplash.com/photo-1696350826221-983026d1c627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc3NjEwODg5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/f1aa9c158241.jpg",
  "https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydHxlbnwxfHx8fDE3NzYxMzMxMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/7ebd8686bee3.jpg",
  "https://images.unsplash.com/photo-1623334044303-241021148842?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnR8ZW58MXx8fHwxNzc2MDU1MDgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/42d17a1a41dc.jpg",
  "https://images.unsplash.com/photo-1688148484023-b56a9b91525a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080":
    "/mock-images/98490fee962e.jpg",
  "https://images.unsplash.com/photo-1564752423896-11d52fbf3257?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200":
    "/mock-images/dbb7b544e9c1.jpg",
  "https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200":
    "/mock-images/070f25482247.jpg",
  "https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzYwODk2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/1fda83eb4cc6.jpg",
  "https://images.unsplash.com/photo-1617965215075-b1f768dc8a61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjB2aWV3fGVufDF8fHx8MTc3NjA4OTY1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/67f5c34daeba.jpg",
  "https://images.unsplash.com/photo-1721884258144-5d788061e4c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2xvdGhpbmclMjBzdG9yZXxlbnwxfHx8fDE3NzYwODk2NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/306cc4f0acb8.jpg",
  "https://images.unsplash.com/photo-1668009219418-4ece0d9e36c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwcGFya3xlbnwxfHx8fDE3NzYwODk2NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/07ba15a5d8c4.jpg",
  "https://images.unsplash.com/photo-1648462908676-8305f0eff8e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc2MDg5NjUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral":
    "/mock-images/f1aa9c158241.jpg",
};

export function localizeMockData<T>(value: T): T {
  if (typeof value === "string") {
    return (MOCK_IMAGE_MAP[value] ?? value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => localizeMockData(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localizeMockData(item)]),
    ) as T;
  }

  return value;
}
