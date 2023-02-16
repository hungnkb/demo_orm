import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "src/data-source";
import { User } from "src/entity/User";

const PORT = 3000;
const app = express();

app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.end("Hello world");
});

AppDataSource.initialize().then(async (connection) => {
  const userRepository = connection.getRepository(User);

  app.use(express.json());

  app.get("/users", async (req: Request, res: Response) => {
    const users = await userRepository.find();
    res.json(users);
  });

//   app.get("/users/:id", async (req: Request, res: Response) => {
//     const result = await userRepository.findOne(req.params.id);
//     return res.send(result);
//   });

  app.post("/users", async (req: Request, res: Response) => {
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

//   app.put("/users/:id", async (req: Request, res: Response) => {
//     const user = await userRepository.findOne(req.params.id);
//     userRepository.merge(user, req.body);
//     const result = await userRepository.save(user);
//     return res.send(result);
//   });

//   app.delete('/users/:id', async (req: Request, res: Response) => {
//     const result = await userRepository.delete(req.params.id);
//     return res.send(result);
//   })
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
