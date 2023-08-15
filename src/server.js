import app from "./app";

const porta = 3001;
app.listen(porta, () => {
    console.log();
    console.log(`Escutando na porta ${porta}`);
    console.log(`CTRL + Clique em http://localhost:${porta}`);
});