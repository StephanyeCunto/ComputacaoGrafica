# Explorações em Computação Gráfica com Three.js

## 📑 Sumário

- [Introdução](#-introdução)
- [Projetos](#-projetos)
  - [Sistema Solar 3D](#sistema-solar-3d)
  - [Terra Plana](#terra-plana)
- [Tecnologias e Implementação](#-tecnologias-e-implementação)
- [Arquitetura](#-arquitetura)
- [Características Visuais](#-características-visuais)
- [Interação e Navegação](#-interação-e-navegação)
- [Desafios Técnicos](#-desafios-técnicos)
- [Requisitos de Sistema](#-requisitos-de-sistema)
- [Instalação e Execução](#-instalação-e-execução)
- [Valor Educacional](#-valor-educacional)
- [Referências](#-referências)

## 🌟 Introdução

Este repositório contém dois projetos de simulação cosmológica desenvolvidos com Three.js como parte da disciplina de Computação Gráfica. Cada projeto explora diferentes abordagens para a visualização de modelos cosmológicos, demonstrando técnicas avançadas de renderização 3D, iluminação, texturização e interatividade.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?logo=javascript&logoColor=white)]()
[![WebGL](https://img.shields.io/badge/WebGL-2.0-red)]()
[![Three.js](https://img.shields.io/badge/Three.js-black?logo=three.js&logoColor=white)]()

## 🌌 Projetos

### Sistema Solar 3D

O **Sistema Solar 3D** é uma simulação astronômica interativa que permite explorar o Sol, os oito planetas principais com suas características distintivas, e detalhes adicionais como a Lua terrestre e os anéis de Saturno.

**Características Principais:**
- **Modelo Heliocêntrico**: Representação do sistema planetário com o Sol ao centro
- **Corpos Celestes**: Sol, Mercúrio, Vênus, Terra (com Lua), Marte, Júpiter, Saturno (com anéis), Urano e Netuno
- **Movimento Orbital**: Implementação das leis de Kepler para órbitas elípticas realistas
- **Rotações Axiais**: Cada planeta gira em seu próprio eixo com velocidade apropriada
- **Detalhes Especiais**: 
  - Terra com camada atmosférica de nuvens e mapas normais para topografia
  - Anéis detalhados para Saturno
  - Lua com órbita própria ao redor da Terra

![Visão Geral do Sistema Solar](/img/Sistema_Solar_3D.png)
<br>
*Visão panorâmica do Sistema Solar*

### Terra Plana

O projeto **Terra Plana** apresenta uma simulação interativa baseada no modelo cosmológico alternativo. Este modelo visualiza a Terra como um disco circular plano coberto por um domo celeste hemisférico.

**Características Principais:**
- **Modelo Geocêntrico Plano**: Representação da Terra como um disco plano central
- **Domo Celeste**: Semiesfera transparente sobre o disco terrestre
- **Corpos Celestes**: Sol e Lua orbitando acima da superfície em movimentos cíclicos
- **Campo de Estrelas**: Distribuição de pontos luminosos no domo celeste
- **Movimentos Complementares**: Sol e Lua em trajetórias circulares opostas

![Visão da Terra Plana](/img/Terra_Plana.png)
<br>
*Visão da Terra Plana com domo celeste*

## 🛠️ Tecnologias e Implementação

Ambos os projetos utilizam um conjunto comum de tecnologias modernas:

### Core
- **Three.js**: Biblioteca JavaScript para renderização 3D
- **WebGL**: API para aceleração gráfica no navegador
- **JavaScript ES6+**: Linguagem de programação principal

### Ferramentas de Desenvolvimento
- **Vite**: Ambiente de desenvolvimento rápido
- **NPM**: Gerenciamento de dependências
- **HTML5/CSS3**: Estrutura e estilo da interface

### Recursos Comuns
- **TrackballControls**: Sistema de navegação da câmera
- **Texturas em Alta Resolução**: Imagens 8K para superfícies detalhadas
- **Iluminação Realista**: Combinação de luzes ambientais e pontuais
- **Animação em Tempo Real**: Ciclo de renderização suave e eficiente

## 🏗️ Arquitetura

### Sistema Solar 3D

```
/
├── index.html           # Página principal 
├── src/
│   ├── index.js         # Inicialização e controlador
│   ├── components/
│   │   ├── planeta.js   # Classe para planetas
│   │   ├── sol.js       # Classe para o sol
│   │   ├── lua.js       # Classe para a lua
│   │   ├── atmosfera.js # Classe para atmosfera da Terra
│   │   ├── anel.js      # Classe para anéis de Saturno
│   │   └── estrela.js   # Classe para campo de estrelas
│   └── assets/
│       └── textures/    # Texturas dos elementos
```

**Classes Principais:**
- `planeta.js`: Gerencia propriedades físicas, rotação e órbita de cada planeta
- `sol.js`: Implementa o corpo central com propriedades específicas e iluminação
- `lua.js`: Gerencia o satélite da Terra e sua órbita
- `atmosfera.js`: Simula a camada de nuvens terrestres
- `anel.js`: Cria e controla os anéis de Saturno
- `estrela.js`: Implementa o campo de estrelas de fundo

### Terra Plana

```
/
├── index.html           # Página principal
├── src/
│   ├── index.js         # Inicialização e controlador
│   ├── terra.js         # Classe para o disco terrestre
│   ├── domo.js          # Classe para o domo celeste
│   ├── atmosfera.js     # Classe para criação da atmosfera (nuvens) da Terra
│   ├── sol.js           # Classe para o sol
│   ├── lua.js           # Classe para a lua
│   ├── estrela.js       # Classe para o campo de estrelas
│   └── assets/
│       └── textures/    # Texturas dos elementos
```

**Classes Principais:**
- `terra.js`: Implementa o disco plano terrestre como base do sistema
- `domo.js`: Cria a semiesfera transparente que cobre a Terra
- `sol.js`: Gerencia o corpo luminoso orbital com iluminação dinâmica
- `atmosfera.js`: Simula a camada de nuvens terrestres
- `lua.js`: Controla o satélite em órbita circular oposta ao sol
- `estrela.js`: Distribui pontos luminosos na semiesfera do domo

## 🎨 Características Visuais

### Sistema Solar 3D
- **Texturas Realistas**: Mapeamento de alta resolução para cada planeta e o Sol
- **Proporções Visuais**: Tamanhos e distâncias planetárias em escala relativa
- **Efeitos Atmosféricos**: Camada semi-transparente de nuvens na Terra
- **Anéis de Saturno**: Textura com canal alfa para transparência
- **Iluminação Solar**: Luz pontual centralizada criando sombras realistas

### Terra Plana
- **Superfície Terrestre**: Textura detalhada 8K do mapa mundi aplicada ao disco
- **Domo Translúcido**: Material semi-transparente permitindo visualização dos corpos celestes
- **Iluminação Dinâmica**: Luz pontual acoplada ao movimento solar
- **Distribuição Estelar**: Algoritmo específico para posicionamento em coordenadas hemisféricas
- **Ciclo Dia/Noite**: Efeito visual criado pelo movimento do Sol ao redor do disco

## 🎮 Interação e Navegação

Ambos os projetos implementam controles intuitivos através do sistema TrackballControls:

- **Rotação da Câmera**: Clique esquerdo e arraste
- **Zoom**: Roda do mouse ou gesto de pinça (dispositivos touch)
- **Movimentação Lateral**: Clique direito e arraste

## 💡 Desafios Técnicos

### No Sistema Solar 3D
- **Órbitas Matematicamente Precisas**: Implementação das leis de Kepler com equações paramétricas
- **Gerenciamento de Hierarquias**: Sistema Terra-Lua como subsistema do modelo solar
- **Renderização Eficiente**: Otimizações para múltiplos corpos detalhados
- **Anéis de Saturno**: Geometria especializada com transparência e orientação adequada
- **Balanceamento de Escala**: Compromisso entre precisão científica e visualização efetiva

### Na Terra Plana
- **Representação do Domo**: Material semitransparente com comportamento visual adequado
- **Movimento Orbital Complementar**: Trajetórias Sol-Lua em sincronização oposta
- **Iluminação da Superfície**: Técnica para iluminar dinamicamente o disco terrestre
- **Distribuição Hemisférica**: Algoritmo para posicionar estrelas em padrão realista
- **Integração Visual**: Harmonia entre os diferentes elementos do modelo

## 💻 Requisitos de Sistema

- **Navegadores Compatíveis**: 
  - Chrome 90+
  - Firefox 88+
  - Safari 14+
  - Edge 90+

- **Hardware Recomendado**:
  - GPU com suporte a WebGL 2.0
  - Mínimo de 4GB de RAM
  - Processador: Intel i5 (7ª geração ou superior) ou equivalente
  
- **Dispositivos Móveis**:
  - iOS 14+ ou Android 10+
  - Mínimo de 4GB de RAM

## 🚀 Instalação e Execução

1. **Pré-requisitos**:
   - Node.js (versão 14 ou superior)
   - NPM 

2. **Clone o repositório**:
   ```bash
   git clone https://github.com/StephanyeCunto/ComputacaoGrafica
   ```

3. **Para o Sistema Solar 3D**:
   ```bash
   cd ComputacaoGrafica/Sistema_Solar/Sistema_Solar_3D
   npm install
   npm start
   ```

4. **Para a Terra Plana**:
   ```bash
   cd ComputacaoGrafica/Terra_Plana
   npm install
   npm start
   ```

5. **Acesse a aplicação**:
   Abra seu navegador e visite `http://localhost:3000`

## 📚 Valor Educacional

Estes projetos demonstram diversos conceitos importantes em computação gráfica:

- **Modelagem 3D**: Criação e manipulação de geometrias tridimensionais
- **Mapeamento de Texturas**: Aplicação de imagens a superfícies 3D
- **Sistemas de Iluminação**: Técnicas de luz e sombra em ambientes virtuais
- **Hierarquia de Objetos**: Relações entre objetos principais e secundários
- **Animação Procedural**: Movimentação baseada em equações matemáticas
- **Otimização de Performance**: Técnicas para renderização eficiente
- **Interatividade 3D**: Sistemas de controle para navegação no espaço virtual

Além disso, o Sistema Solar 3D permite explorar conceitos astronômicos enquanto a Terra Plana demonstra um modelo cosmológico alternativo, ambos ilustrando aplicação de conhecimentos físicos e matemáticos na computação gráfica.

## 📚 Referências

### Documentação Técnica
- [Documentação do Three.js](https://threejs.org/docs/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

### Fontes de Dados Astronômicos
- [NASA Solar System Exploration](https://solarsystem.nasa.gov/)
- [Solar System Scope](https://www.solarsystemscope.com/)
- [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/)

### Modelos Cosmológicos
- [Wikipedia - Sistema Solar](https://pt.wikipedia.org/wiki/Sistema_Solar)
- [Wikipedia - Modelo da Terra Plana](https://pt.wikipedia.org/wiki/Terra_plana)
- [Flat Earth Society](https://www.tfes.org/)

---
<div align="center">
  <p>Desenvolvido como projetos para a disciplina de Computação Gráfica</p>
  <p>© 2025 - <a href="https://github.com/StephanyeCunto">Stephanye Cunto</a></p>
</div>