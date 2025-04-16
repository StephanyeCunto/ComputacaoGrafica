# Sistema Solar 3D - Trabalho de Computação Gráfica

Uma visualização interativa do sistema solar desenvolvida com Three.js para a disciplina de Computação Gráfica.

## 📋 Sobre o Projeto

Este projeto é o primeiro trabalho da disciplina de Computação Gráfica e consiste em uma simulação 3D do sistema solar usando a biblioteca Three.js. A aplicação renderiza o sol e os planetas do sistema solar com texturas realistas, permitindo que o usuário navegue pelo espaço com controles interativos.

### Características

- Renderização 3D do sol e dos planetas do sistema solar
- Texturas de alta qualidade para cada planeta
- Rotação dos planetas em seus próprios eixos
- Iluminação dinâmica centralizada no sol
- Controles de câmera TrackballControls para navegação interativa
- Tratamento especial para a Terra com camada de nuvens

## 🛠️ Tecnologias Utilizadas

- [Three.js](https://threejs.org/) - Biblioteca JavaScript para criar e exibir gráficos 3D animados em um navegador web
- JavaScript ES6+
- HTML5 e CSS3

## ⚙️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/StephanyeCunto/ComputacaoGrafica
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd Sistema_Solar-3D
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

5. Abra o navegador e acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

- `index.js` - Arquivo principal que configura a cena, câmera, renderizador e controles
- `planeta.js` - Classe para criação e gerenciamento dos planetas
- `src/img/` - Diretório com as texturas dos planetas

## 🧩 Classe Planeta

A classe `planeta` é responsável por criar e gerenciar os planetas do sistema solar:

```javascript
import * as THREE from 'three';
export class planeta {
    constructor(radius, texture, position) {
        this.radius = radius;
        this.position = position;
        this.distanceSol = position.x;
        this.geometry = new THREE.SphereGeometry(this.radius, 64, 64);
        this.texture = texture;
        if (texture == "earth") {
            this.material = this.materialTerra();
        } else {
            this.material = new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load(this.texture) });
        }
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    }
    // Métodos da classe...
}
```

## 📚 Referências

- [Documentação do Three.js](https://threejs.org/docs/)
- [Solar System Scope](https://www.solarsystemscope.com/) - Referência visual
- [NASA Solar System Exploration](https://solarsystem.nasa.gov/) - Texturas e informações sobre os planetas
