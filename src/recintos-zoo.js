class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: { 'MACACO': 3 } },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: {} },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: { 'GAZELA': 1 } },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: {} },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: { 'LEAO': 1 } }
    ];

    this.animais = {
      'LEAO': { tamanho: 3, biomas: ['savana'] },
      'LEOPARDO': { tamanho: 2, biomas: ['savana'] },
      'CROCODILO': { tamanho: 3, biomas: ['rio'] },
      'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'] },
      'GAZELA': { tamanho: 2, biomas: ['savana'] },
      'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'] }
    };
  }

  analisaRecintos(tipoAnimal, quantidade) {
    if (!this.animais[tipoAnimal]) {
      return { erro: 'Animal inválido' };
    }

    if (typeof quantidade !== 'number' || quantidade <= 0) {
      return { erro: 'Quantidade inválida' };
    }

    const animal = this.animais[tipoAnimal];
    const recintosViaveis = [];

    for (const recinto of this.recintos) {
      const { bioma, tamanhoTotal, animaisExistentes } = recinto;
      const espacoUsadoExistente = Object.keys(animaisExistentes).reduce((sum, especie) => {
        return sum + (this.animais[especie].tamanho * animaisExistentes[especie]);
      }, 0);

      let espacoDisponivel = tamanhoTotal - espacoUsadoExistente;
      let podeAcomodar = true;

      if (bioma === 'savana e rio' && tipoAnimal === 'HIPOPOTAMO') {
        if (espacoDisponivel >= (animal.tamanho * quantidade) + 1) {
          espacoDisponivel -= (animal.tamanho * quantidade) + 1;
        } else {
          podeAcomodar = false;
        }
      } else if (bioma === 'savana' && tipoAnimal === 'MACACO') {
        const espacoNecessario = (animal.tamanho * quantidade) + (quantidade > 1 ? 1 : 0);
        if (espacoDisponivel >= espacoNecessario) {
          espacoDisponivel -= espacoNecessario;
        } else {
          podeAcomodar = false;
        }
      } else if (animal.biomas.includes(bioma) && espacoDisponivel >= (animal.tamanho * quantidade)) {
        espacoDisponivel -= animal.tamanho * quantidade;
      } else {
        podeAcomodar = false;
      }

      if (podeAcomodar) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel} total: ${tamanhoTotal})`);
      }
    }

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    return { recintosViaveis: recintosViaveis.sort() };
  }
}

module.exports = { RecintosZoo };
