# 🏥 Farmácia Hiper Real - E-commerce Completo

## 📋 Descrição
Site de e-commerce profissional desenvolvido para a Farmácia Hiper Real, localizada em Monte Santo-BA. O projeto oferece uma experiência completa de compra online com design moderno, funcionalidades avançadas e integração com WhatsApp.

## ✨ Características Principais

### 🎨 Design e Interface
- **Design Responsivo**: Adapta-se perfeitamente a desktop, tablet e mobile
- **Interface Moderna**: Layout profissional com gradientes e animações suaves
- **Identidade Visual**: Cores douradas que refletem a marca da farmácia
- **Tipografia**: Fonte Poppins para melhor legibilidade
- **Animações**: Efeitos de hover, transições e micro-interações

### 🛒 Funcionalidades de E-commerce
- **Carrinho de Compras**: Sistema completo com localStorage
- **Busca Inteligente**: Busca em tempo real nos produtos
- **Categorização**: Produtos organizados por categorias
- **Avaliações**: Sistema de estrelas para produtos
- **Preços**: Exibição de preços com parcelamento
- **Badges**: Identificação visual (Destaque, Novidade, Saudável, Oferta)

### 📱 Integração WhatsApp
- **Compra Direta**: Finalização via WhatsApp com carrinho completo
- **Consulta Produtos**: Interesse em produtos específicos
- **Atendimento**: Botão flutuante para contato direto
- **Mensagens Personalizadas**: Templates automáticos para cada ação

### 🔧 Funcionalidades Técnicas
- **PWA Ready**: Preparado para Progressive Web App
- **SEO Otimizado**: Meta tags e estrutura semântica
- **Performance**: Carregamento otimizado e lazy loading
- **Acessibilidade**: Navegação por teclado e screen readers
- **Cross-browser**: Compatibilidade com todos os navegadores

## 🏗️ Estrutura do Projeto

```
farmacia-hiper-real/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos principais
├── js/
│   └── script.js           # Funcionalidades JavaScript
├── img/                    # Imagens e assets
│   ├── 1000224880.png      # Logo da farmácia
│   ├── 1000225828.jpg      # Neosaldina Muscular
│   ├── 1000225826.jpg      # Linha Benegrip
│   └── 1000225825.jpg      # Dr. Peanut Pistache
├── produtos/               # Páginas de produtos (futuro)
├── checkout/               # Páginas de checkout (futuro)
└── README.md               # Esta documentação
```

## 🎯 Produtos em Destaque

### 1. Neosaldina Muscular (Produto Principal)
- **Preço**: R$ 24,90 (3x de R$ 8,30)
- **Categoria**: Medicamento (Tarja Vermelha)
- **Descrição**: Alívio rápido para dores musculares e tensão
- **Avaliação**: 5 estrelas (127 avaliações)

### 2. Benegrip Multi
- **Preço**: R$ 18,90 (2x de R$ 9,45)
- **Categoria**: Medicamento
- **Descrição**: Confiança em dose dupla para tosse e imunidade
- **Avaliação**: 4 estrelas (89 avaliações)

### 3. Dr. Peanut Pistache
- **Preço**: R$ 32,90
- **Categoria**: Suplemento Saudável
- **Descrição**: Nutrição, sabor e qualidade em um só produto
- **Características**: Zero lactose, 600g
- **Avaliação**: 5 estrelas (203 avaliações)

### 4. Vitamina C 1000mg
- **Preço**: R$ 29,90 (de R$ 45,90)
- **Categoria**: Suplemento em Oferta
- **Descrição**: Fortalece o sistema imunológico
- **Avaliação**: 4 estrelas (156 avaliações)

## 🏪 Informações da Farmácia

### 📍 Localização
- **Endereço**: Rua Maria Suely Pinheiro, 58
- **Cidade**: Monte Santo - BA
- **CEP**: 48800-000

### 📞 Contato
- **Telefone**: (75) 9219-6765
- **WhatsApp**: (75) 9219-6765
- **E-mail**: contato@farmaciahiperreal.com.br

### 🕒 Horário de Funcionamento
- **Segunda a Sexta**: 7h às 22h
- **Sábado e Domingo**: 8h às 20h

## 💳 Formas de Pagamento
- **Cartões**: Visa, Mastercard
- **PIX**: Pagamento instantâneo
- **Boleto**: Pagamento tradicional
- **Parcelamento**: Até 12x sem juros

## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica moderna
- **CSS3**: Estilos avançados com Flexbox e Grid
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia Poppins

### Funcionalidades JavaScript
- **Carrinho de Compras**: Sistema completo com localStorage
- **Busca em Tempo Real**: Filtros dinâmicos
- **Animações**: Intersection Observer API
- **Responsividade**: Menu mobile e adaptações
- **Notificações**: Sistema de feedback visual
- **Performance**: Lazy loading e otimizações

## 📱 Responsividade

### Desktop (1200px+)
- Layout em grid com produtos lado a lado
- Menu horizontal completo
- Banner com duas colunas
- Hover effects completos

### Tablet (768px - 1199px)
- Adaptação do grid de produtos
- Menu responsivo
- Banner em coluna única
- Botões otimizados

### Mobile (até 767px)
- Layout em coluna única
- Menu hambúrguer
- Botões full-width
- Navegação touch-friendly

## 🎨 Paleta de Cores

```css
--primary-color: #D4AF37    /* Dourado principal */
--primary-dark: #B8941F     /* Dourado escuro */
--secondary-color: #2E7D32  /* Verde farmácia */
--accent-color: #FF6B35     /* Laranja destaque */
--text-dark: #333333        /* Texto principal */
--text-light: #666666       /* Texto secundário */
--bg-light: #F8F9FA         /* Fundo claro */
```

## 🔧 Como Usar

### 1. Instalação Local
```bash
# Clone ou baixe os arquivos
# Abra index.html em um navegador
# Ou use um servidor local:
python -m http.server 8000
# Acesse: http://localhost:8000
```

### 2. Hospedagem
- Faça upload dos arquivos para seu servidor web
- Configure SSL (HTTPS recomendado)
- Teste todas as funcionalidades
- Configure domínio personalizado

### 3. Personalização
- **Produtos**: Edite as informações no HTML
- **Cores**: Modifique as variáveis CSS
- **Contato**: Atualize número do WhatsApp
- **Imagens**: Substitua na pasta img/

## 📈 Funcionalidades Avançadas

### Sistema de Carrinho
```javascript
// Adicionar produto
ecommerce.addToCart(event);

// Visualizar carrinho
ecommerce.openCartModal();

// Finalizar compra
ecommerce.checkout(); // Redireciona para WhatsApp
```

### Busca Inteligente
- Busca em tempo real (debounced)
- Filtros por nome e descrição
- Destaque visual dos resultados
- Reset automático

### Animações
- Fade in ao scroll
- Hover effects nos produtos
- Animações de loading
- Transições suaves

## 🛡️ Segurança e Performance

### Segurança
- Validação de dados no frontend
- Sanitização de inputs
- Proteção contra XSS básica
- HTTPS recomendado

### Performance
- Imagens otimizadas
- CSS e JS minificados (produção)
- Lazy loading implementado
- Cache de localStorage

## 🔮 Futuras Implementações

### Fase 2
- [ ] Sistema de login/cadastro
- [ ] Painel administrativo
- [ ] Gestão de estoque
- [ ] Relatórios de vendas

### Fase 3
- [ ] Integração com gateway de pagamento
- [ ] Sistema de entrega
- [ ] Programa de fidelidade
- [ ] App mobile nativo

## 📞 Suporte

Para dúvidas ou suporte técnico:
- **WhatsApp**: (75) 9219-6765
- **E-mail**: contato@farmaciahiperreal.com.br

## 📄 Licença

© 2024 Farmácia Hiper Real. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para a Farmácia Hiper Real**

