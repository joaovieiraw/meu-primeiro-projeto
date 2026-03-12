const https = require("https");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Digite o CEP: ", (cep) => {

  const url = `https://viacep.com.br/ws/${cep}/json/`;

  https.get(url, (res) => {

    console.log("\nStatus Code:", res.statusCode);

    console.log("\nHeaders:");
    console.log(res.headers);

    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {

      const body = JSON.parse(data);

      console.log("\nBody (JSON):");
      console.log(body);

      console.log("\nEndereço encontrado:");
      console.log("Rua:", body.logradouro);
      console.log("Bairro:", body.bairro);
      console.log("Cidade:", body.localidade);
      console.log("Estado:", body.uf);

      rl.close();
    });

  }).on("error", (err) => {
    console.log("Erro:", err.message);
    rl.close();
  });

});