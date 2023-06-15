const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());

// Conectar ao banco de dados MongoDB
mongoose.connect("mongodb://falaagro:8Y05gUCLPt4kuT3WApG8Ev9Ah8TBAZvSC0GmCsQ4WchANuAzrfHQrzCUojEi6ZhtSklVAzYr2EEJACDbip4oZA==@falaagro.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@falaagro@", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão com o MongoDB:"));
db.once("open", () => {
  console.log("Conectado ao MongoDB");
});

// Definir o esquema do documento
const dadosSchema = new mongoose.Schema({
  valorInicial: Number,
  valorFinal: Number,
  dataInicial: String,
  dataFinal: String,
  resultadoKwh: Number,
  resultadoPeriodo: String,
  resultadoValor: Number,
});

// Criar o modelo do documento
const Dados = mongoose.model("Dados", dadosSchema);

// Rota para buscar todos os dados
app.get("/dados", (req, res) => {
  Dados.find({})
    .then(dados => {
      res.status(200).json(dados);
    })
    .catch(err => {
      console.error("Erro ao buscar os dados:", err);
      res.status(500).json({ error: "Erro ao buscar os dados" });
    });
});

app.get("/dados/:id", (req, res) => {
  const id = req.params.id;

  Dados.findById(id)
    .then(dados => {
      if (!dados) {
        return res.status(404).json({ error: "Dados não encontrados" });
      }
      res.status(200).json(dados);
    })
    .catch(err => {
      console.error("Erro ao buscar os dados:", err);
      res.status(500).json({ error: "Erro ao buscar os dados" });
    });
});

// Rota para buscar o último dado
app.get("/dados/ultimo", (req, res) => {
  Dados.findOne({}, {}, { sort: { _id: -1 } })
    .then(dados => {
      res.status(200).json(dados);
    })
    .catch(err => {
      console.error("Erro ao buscar o último conjunto de dados:", err);
      res.status(500).json({ error: "Erro ao buscar o último conjunto de dados" });
    });
});

app.post("/dados", (req, res) => {
  const dados = req.body;

  // Criar uma nova instância do modelo Dados com os dados recebidos
  Dados.create(dados)
    .then(resultado => {
      console.log("Dados salvos com sucesso!");
      res.status(200).json({ message: "Dados salvos com sucesso!" });
    })
    .catch(err => {
      console.error("Erro ao salvar os dados:", err);
      res.status(500).json({ error: "Erro ao salvar os dados" });
    });
});

app.put("/dados/:id", (req, res) => {
  const id = req.params.id;
  const dados = req.body;

  Dados.findByIdAndUpdate(id, dados)
    .then(() => {
      console.log("Dados atualizados com sucesso!");
      res.status(200).json({ message: "Dados atualizados com sucesso!" });
    })
    .catch(err => {
      console.error("Erro ao atualizar os dados:", err);
      res.status(500).json({ error: "Erro ao atualizar os dados" });
    });
});

app.delete("/dados", (req, res) => {
  Dados.deleteMany({})
    .then(() => {
      console.log("Todos os dados foram deletados");
      res.status(200).json({ message: "Todos os dados foram deletados" });
    })
    .catch(err => {
      console.error("Erro ao deletar os dados:", err);
      res.status(500).json({ error: "Erro ao deletar os dados" });
    });
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log("API server running on port 3000");
});
