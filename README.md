# Repositório de Computação Gráfica

Este repositório contém trabalhos desenvolvidos para a disciplina de Computação Gráfica, focando em aplicações práticas de renderização 3D, animações e simulações gráficas.
<br><br>
[![Three.js](https://img.shields.io/badge/Three.js-black?logo=three.js&logoColor=white)]()
[![wakatime](https://wakatime.com/badge/user/5a343522-23db-45ae-b20b-54655c392390/project/124beb58-3e33-4c8a-aec4-33dc1bf1bcfc.svg)](https://wakatime.com/badge/user/5a343522-23db-45ae-b20b-54655c392390/project/124beb58-3e33-4c8a-aec4-33dc1bf1bcfc)

# Sumário
- [Sistema Solar](#sumário---sistema-solar-3d)
- [Terra Plana](#sumário---terra-plana)

---
## Sumário - Sistema Solar 3D

- [Descrição do Projeto](#descrição-do-projeto)
- [Características](#características)
- [Capturas de Tela](#capturas-de-tela)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Diagrama de Classes](#diagrama-de-classes)
- [Como Executar](#como-executar)
  - [Controles](#controles)
- [Implementação](#implementação)
  - [Detalhes da Implementação das Classes](#detalhes-da-implementação-das-classes)
- [Desafios e Soluções](#desafios-e-soluções)
- [Referências](#referências)


## Sistema Solar - Primeira Atividade

### Descrição do Projeto

Este projeto implementa uma simulação 3D do Sistema Solar utilizando a biblioteca Three.js. A aplicação renderiza o Sol e os planetas do Sistema Solar com suas respectivas órbitas, rotações e características visuais.

### Características

- Renderização 3D de alta qualidade com WebGL
- Simulação de órbitas planetárias com velocidades proporcionais às distâncias
- Texturas realistas para cada planeta
- Controle de câmera interativo com TrackballControls
- Iluminação ambiental e solar
- Terra com mapa normal e camada de nuvens
- Lua orbitando a Terra

### Capturas de Tela

![Visão Geral do Sistema Solar](/img/Sistema_Solar_3D.png)
<br>
*Visão panorâmica de todo o sistema solar*

![Detalhes da Terra](/img/Terra_Detalhe.png)
<br>
*Close na Terra mostrando detalhes das nuvens*

### Tecnologias Utilizadas

- [Three.js](https://threejs.org/) - Biblioteca JavaScript para gráficos 3D
- WebGL - API para renderização gráfica no navegador
- JavaScript ES6+ - Linguagem de programação moderna
- HTML5 e CSS3 - Estruturação e estilização da interface
- NPM - Gerenciamento de dependências
- Vite - Ambiente de desenvolvimento rápido

### Requisitos do Sistema

- **Navegadores Compatíveis**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Hardware Recomendado**: 
  - GPU dedicada recomendada para melhor desempenho
  - Mínimo de 4GB de RAM
  - Processador: Intel i5 (7ª geração ou superior) ou equivalente
- **Dispositivos Móveis**: Compatível com smartphones e tablets
- **Conexão de Internet**: Necessária apenas para o carregamento inicial das texturas


### Estrutura do Projeto

```
/
├── index.html           # Página principal da aplicação
├── src/
│   ├── index.js          # Arquivo principal com inicialização da cena
│   ├── planeta.js       # Classe para criação e controle dos planetas
│   ├── sol.js           # Classe para criação e controle do sol
│   ├── lua.js           # Classe para criação e controle do sol
│   ├── atmosfera.js     # Classe para criação da atmosfera (nuvens) da Terra
│   ├── anel.js          # Classe para criação dos anéis de Saturno
│   ├── estrela.js       # Classe para criação do campo de estrelas de fundo
│   └── assets/
│       └── textures/    # Texturas dos planetas e do sol
│       ├── 8k_sun.jpg
│       ├── 8k_mercury.jpg
│       ├── 8k_venus_surface.jpg
│       ├── 8k_earth_daymap.jpg
│       ├── 8k_mars.jpg
│       ├── 8k_jupiter.jpg
│       ├── 8k_saturn.jpg
│       ├── 8k_saturn_ring_alpha.png
│       ├── 2k_neptune.jpg
│       └── 2k_uranus.jpg
```


### Diagrama de Classes

O diagrama a seguir ilustra a estrutura de classes da aplicação e seus relacionamentos:

```mermaid
classDiagram
 class THREE {
   <<Library>>
   +WebGLRenderer
   +PerspectiveCamera
   +Scene
   +SphereGeometry
   +MeshBasicMaterial
   +MeshStandardMaterial
   +MeshPhongMaterial
   +Mesh
   +AmbientLight
   +PointLight
   +TextureLoader
   +Group
   +Vector2
   +Color
   +RingGeometry
 }
 class TrackballControls {
 <<Library>>
 -camera
 -domElement
 +update()
 }
 class Planeta {
 <<Entity>>
 -radius: Number
 -position: Object
 -distanceSol: Number
 -geometry: SphereGeometry
 -texture: String
 -speed: Number
 -speedOrbita: Number
 -material: MeshStandardMaterial
 -mesh: Mesh
 -grupo: Group
 -lua: Lua
 -atmosfera: Atmosfera
 -anel: Anel
 +constructor(radius, texture, position, scene, atmosphere, lua, earth, anel)
 +rotate()
 +translate()
 +tick()
 +materialGenerico()
 +materialTerra()
 }
 class Lua {
 <<Entity>>
 -radius: Number
 -geometry: SphereGeometry
 -texture: String
 -material: MeshStandardMaterial
 -mesh: Mesh
 +constructor()
 +tick()
 }
 class Atmosfera {
 <<Entity>>
 -radius: Number
 -geometry: SphereGeometry
 -texture: Texture
 -material: MeshStandardMaterial
 -mesh: Mesh
 +constructor(radius)
 +tick()
 }
 class Anel {
 <<Entity>>
 -radius: Number
 -geometry: RingGeometry
 -texture: String
 -material: MeshPhongMaterial
 -mesh: Mesh
 +constructor(radius)
 +tick()
 }

 class Sol {
<<Entity>>
-radius: Number
 -geometry: SphereGeometry
 -texture: Texture
 -material: MeshBasicMaterial
 -mesh: Mesh
 +constructor()
 +tick()
 }

 class Estrela{
<<Entity>>
-largura: Number
-altura: Number
-grupo : Group
-mesh: Mesh
-color: Number
+constructor()
+randonPosition()
+criarEstrela(radius, position)
}

 class Index {
 <<Controller>>
 -renderer: WebGLRenderer
 -camera: PerspectiveCamera
 -controls: TrackballControls
 -scene: Scene
 -planetas: Array
 -sol: Sol
 +adicionaLuz()
 +criarSistemaSolar()
 +criarPlanetas()
 +animate()
 }

 Planeta --> Lua : cria e contém
 Planeta --> Atmosfera : cria e contém
 Planeta --> Anel : cria e contém
 Planeta --> THREE : utiliza
 Index --> Planeta : cria e gerencia
 Index --> Sol : cria e gerencia
 Index --> Estrela : cria
 Index --> THREE : utiliza
 Index --> TrackballControls : utiliza
 Lua --> THREE : utiliza
 Atmosfera --> THREE : utiliza
 Anel --> THREE : utiliza
 Sol --> THREE : utiliza
 Estrela --> THREE : utiliza
```


## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/StephanyeCunto/ComputacaoGrafica
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd Sistema_Solar/Sistema_Solar_3D
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm start
   ```

5. Abra o navegador e acesse `http://localhost:3000`

### Controles

- **Rotação da câmera**: Clique e arraste com o mouse
- **Zoom**: Use a roda do mouse ou pinça (em dispositivos touch)
- **Pan**: Clique com o botão direito e arraste

### Implementação

O código está estruturado em classes e funções modulares:

- `index.js`: Configura o renderer, câmera, controles e cena. Gerencia a animação.
- `planeta.js`: Classe responsável pela criação e comportamento dos planetas.
- `lua.js`: Classe para simular a lua e sua órbita.
- `sol.js`: Classe dedicada à criação e comportamento do Sol.
- `atmosfera.js`: Classe para simular a camada de nuvens da Terra.
- `anel.js`: Classe para criar e gerenciar os anéis de Saturno.
- `estrela.js`: Classe para implementar um campo de estrelas como background.

#### Detalhes da Implementação das Classes

1. **`Planeta`**:
   - Encapsula a criação, renderização e comportamento de cada planeta
   - Gerencia componentes associados como lua e atmosfera
   - Implementa movimentos de rotação e translação com física simplificada

2. **`Sol`**:
   - Centro do sistema simulado
   - Implementa material emissivo para simular luz própria
   - Fonte de iluminação para os planetas (PointLight)

3. **`Lua`**:
   - Satélite natural com órbita própria em torno da Terra
   - Sincronização de movimento com o planeta hospedeiro

4. **`Atmosfera`**:
   - Camada adicional para representar nuvens terrestres
   - Material semi-transparente com animação própria

5. **`Anel`**:
   - Geometria específica para os anéis de Saturno
   - Textura com canal alpha para transparência

6. **`Estrela`**:
   - Sistema otimizado para renderizar milhares de pontos
   - Distribuição aleatória para criar o efeito de céu estrelado

7. **`Index (Arquivo principal)`**:
   - Configura o ambiente de renderização
   - Gerencia o ciclo de animação


### Desafios e Soluções

- **Órbitas Planetárias**: 
  - **Desafio**: Conseguir simulação precisa das órbitas elípticas com período correto.
  - **Solução**: Implementação das leis de Kepler usando equações paramétricas e ajuste das velocidades baseado na distância ao Sol.

- **Iluminação Realista**: 
  - **Desafio**: Criar iluminação convincente e sombras realistas.
  - **Solução**: Utilizamos PointLight para o Sol e configuramos materiais com propriedades reflectivas corretas. Ajustes nos parâmetros de roughness e metalness para cada planeta.

## Referências

- [Documentação do Three.js](https://threejs.org/docs/)
- [Solar System Scope](https://www.solarsystemscope.com/) - Referência visual
- [NASA Solar System Exploration](https://solarsystem.nasa.gov/) - Texturas e informações sobre os planetas

---
## Sumário - Terra Plana 

- [Descrição do Projeto](#descrição-do-projeto)
- [Características](#características)
- [Capturas de Tela](#capturas-de-tela)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Diagrama de Classes](#diagrama-de-classes)
- [Como Executar](#como-executar)
  - [Controles](#controles)
- [Implementação](#implementação)
  - [Detalhes da Implementação das Classes](#detalhes-da-implementação-das-classes)
- [Desafios e Soluções](#desafios-e-soluções)
- [Referências](#referências)

## Terra Plana - Segunda Atividade

### Descrição do Projeto

Este projeto implementa uma simulação 3D da Terra Plana utilizando a biblioteca Three.js. A aplicação renderiza um disco plano representando a Terra, coberto por um domo semiesférico contendo o Sol, a Lua e as estrelas que giram ao redor da Terra fixa.

### Características

- Renderização 3D de alta qualidade com WebGL
- Modelo da Terra como um disco plano com textura detalhada
- Domo celeste semiesférico transparente
- Sol e Lua orbitando dentro do domo
- Campo de estrelas como plano de fundo
- Iluminação dinâmica que varia conforme a posição do Sol
- Controle de câmera interativo com TrackballControls

### Capturas de Tela

![Visão Geral da Terra Plana](/img/Terra_Plana.png)
<br>
*Visão panorâmica da Terra Plana e seu domo celeste*

### Tecnologias Utilizadas

- [Three.js](https://threejs.org/) - Biblioteca JavaScript para gráficos 3D
- WebGL - API para renderização gráfica no navegador
- JavaScript ES6+ - Linguagem de programação moderna
- HTML5 e CSS3 - Estruturação e estilização da interface
- NPM - Gerenciamento de dependências
- Vite - Ambiente de desenvolvimento rápido

### Requisitos do Sistema

- **Navegadores Compatíveis**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Hardware Recomendado**: 
  - GPU dedicada recomendada para melhor desempenho
  - Mínimo de 4GB de RAM
  - Processador: Intel i5 (7ª geração ou superior) ou equivalente
- **Dispositivos Móveis**: Compatível com smartphones e tablets
- **Conexão de Internet**: Necessária apenas para o carregamento inicial das texturas

### Estrutura do Projeto

```
/
├── index.html           # Página principal da aplicação
├── src/
│   ├── index.js         # Arquivo principal com inicialização da cena
│   ├── terra.js         # Classe para criação do disco terrestre
│   ├── domo.js          # Classe para criação do domo celeste
│   ├── sol.js           # Classe para criação e controle do sol
│   ├── lua.js           # Classe para criação e controle da lua
│   ├── estrela.js       # Classe para criação do campo de estrelas
│   └── assets/
│       └── textures/    # Texturas dos elementos
│           ├── 8k_sun.jpg
│           ├── 8k_earth_daymap.jpg
│           ├── 8k_earth_normal.jpg
│           ├── 8k_moon.jpg
```

### Diagrama de Classes

O diagrama a seguir ilustra a estrutura de classes da aplicação e seus relacionamentos:

```mermaid
classDiagram
 class THREE {
   <<Library>>
   +WebGLRenderer
   +PerspectiveCamera
   +Scene
   +CircleGeometry
   +SphereGeometry
   +MeshBasicMaterial
   +MeshStandardMaterial
   +PointsMaterial
   +Mesh
   +AmbientLight
   +PointLight
   +TextureLoader
   +Group
   +BufferGeometry
   +BufferAttribute
   +Points
   +Color
 }
 class TrackballControls {
   <<Library>>
   -camera
   -domElement
   +update()
 }
 class Terra {
   <<Entity>>
   -radius: Number
   -geometry: CircleGeometry
   -texture: Texture
   -material: MeshStandardMaterial
   -mesh: Mesh
   -grupo: Group
   -domo: Domo
   +constructor()
   +tick()
 }
 class Domo {
   <<Entity>>
   -radius: Number
   -geometry: SphereGeometry
   -material: MeshStandardMaterial
   -mesh: Mesh
   -grupo: Group
   -sol: Sol
   -lua: Lua
   +constructor(radius)
   +tick()
 }
 class Sol {
   <<Entity>>
   -radius: Number
   -geometry: SphereGeometry
   -texture: Texture
   -material: MeshBasicMaterial
   -sol: Mesh
   -luzSolar: PointLight
   -Mesh: Group
   +constructor(radius)
   +tick()
 }
 class Lua {
   <<Entity>>
   -radius: Number
   -geometry: SphereGeometry
   -texture: String
   -material: MeshStandardMaterial
   -Mesh: Mesh
   +constructor(radius)
   +tick()
 }
 class Estrela {
   <<Entity>>
   -radius: Number
   -Mesh: Group
   +constructor(radius)
   +randonPosition()
   +criarEstrela(radius, position, color)
 }
 class Index {
   <<Controller>>
   -renderer: WebGLRenderer
   -camera: PerspectiveCamera
   -controls: TrackballControls
   -scene: Scene
   -terra: Terra
   +criarSistema()
   +adicionarLuz()
   +animate()
 }

 Terra --> Domo : cria e contém
 Domo --> Sol : cria e contém
 Domo --> Lua : cria e contém
 Domo --> Estrela : cria e contém
 Terra --> THREE : utiliza
 Domo --> THREE : utiliza
 Sol --> THREE : utiliza
 Lua --> THREE : utiliza
 Estrela --> THREE : utiliza
 Index --> Terra : cria e gerencia
 Index --> THREE : utiliza
 Index --> TrackballControls : utiliza
```

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/StephanyeCunto/ComputacaoGrafica
   ```

2. Navegue até a pasta do projeto:
   ```bash
   cd Terra_Plana
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm start
   ```

5. Abra o navegador e acesse `http://localhost:3000`

### Controles

- **Rotação da câmera**: Clique e arraste com o mouse
- **Zoom**: Use a roda do mouse ou pinça (em dispositivos touch)
- **Pan**: Clique com o botão direito e arraste

### Implementação

O código está estruturado em classes e funções modulares:

- `index.js`: Configura o renderer, câmera, controles e cena. Gerencia a animação.
- `terra.js`: Classe responsável pela criação do disco terrestre plano.
- `domo.js`: Classe para criar o domo celeste semiesférico.
- `sol.js`: Classe dedicada à criação e movimento do Sol.
- `lua.js`: Classe para criar e controlar o movimento da Lua.
- `estrela.js`: Classe para implementar um campo de estrelas como background.

#### Detalhes da Implementação das Classes

1. **`Terra`**:
   - Implementa um disco plano com textura terrestre
   - Serve como base fixa para todo o sistema
   - Gerencia o domo celeste como componente associado

2. **`Domo`**:
   - Cria uma semiesfera transparente sobre o disco da Terra
   - Contém Sol, Lua e campo de estrelas
   - Implementa materiais translúcidos para efeito visual

3. **`Sol`**:
   - Esfera luminosa que orbita dentro do domo
   - Implementa material emissivo para simular luz própria
   - Inclui uma fonte de luz pontual para iluminar a Terra

4. **`Lua`**:
   - Satélite que orbita em sentido contrário ao Sol
   - Implementa material reflexivo para simulação realista

5. **`Estrela`**:
   - Sistema de partículas para criar o campo de estrelas
   - Distribui pontos aleatoriamente em uma semiesfera
   - Utiliza diferentes cores para maior realismo visual

6. **`Index (Arquivo principal)`**:
   - Configura o ambiente de renderização
   - Gerencia o ciclo de animação
   - Configura iluminação ambiente


### Desafios e Soluções

- **Distribuição das Estrelas**: 
  - **Desafio**: Criar distribuição realista de estrelas na superfície interna do domo.
  - **Solução**: Algoritmo de geração de pontos em coordenadas esféricas com variação de tamanho e cor.

- **Iluminação Dinâmica**: 
  - **Desafio**: Criar variação de iluminação da Terra conforme posição do Sol.
  - **Solução**: Uso de PointLight acoplada ao objeto Sol com parâmetros de intensidade e atenuação ajustados.

## Referências

- [Documentação do Three.js](https://threejs.org/docs/)
- [Solar System Scope](https://www.solarsystemscope.com/) - Referência visual
- [NASA Solar System Exploration](https://solarsystem.nasa.gov/) - Texturas e informações sobre os planetas
- [Flat Earth Society](https://www.tfes.org/) - Referência para o modelo cosmológico alternativo
- [Wikipedia - Modelo da Terra Plana ](https://pt.wikipedia.org/wiki/Terra_plana) - Informações sobre o modelo alternativo 
 
---
<div align="center">
  <p>Desenvolvido como projeto para a disciplina de Computação Gráfica</p>
  <p>© 2025 - <a href="https://github.com/StephanyeCunto">Stephanye Cunto</a></p>
</div>