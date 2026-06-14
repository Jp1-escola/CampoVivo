document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form-calculadora');
    const resultadoContainer = document.getElementById('resultado-calculadora');

    // Cards existentes
    const resEconomia = document.getElementById('res-economia');
    const resCo2 = document.getElementById('res-co2');
    const resIndice = document.getElementById('res-indice');

    // Novos cards
    const resProdutividade = document.getElementById('res-produtividade');
    const resAgua = document.getElementById('res-agua');
    const resCarbono = document.getElementById('res-carbono');

    const barraProdutividade = document.getElementById('barra-produtividade');
    const barraAgua = document.getElementById('barra-agua');
    const barraCarbono = document.getElementById('barra-carbono');
    const barraIndice = document.getElementById('barra-indice');

    const textoProdutividade = document.getElementById('texto-produtividade');
    const textoAgua = document.getElementById('texto-agua');
    const textoCarbono = document.getElementById('texto-carbono');
    const textoIndice = document.getElementById('texto-indice');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const consumoMensal = parseFloat(
                document.getElementById('tamanho-hectares').value
            );

            const tecnologia =
                document.getElementById('tecnologia-escolhida').value;

            let energiaAno = 0;
            let co2Evitado = 0;
            let indice = 0;

            let produtividade = 0;
            let economiaAgua = 0;
            let reducaoEmissoes = 0;

            switch (tecnologia) {
                case 'solar':
                    energiaAno = consumoMensal * 12;
                    co2Evitado = Math.round(energiaAno * 0.092);
                    produtividade = 15;
                    economiaAgua = 22;
                    reducaoEmissoes = 18;
                    indice = 94;
                    break;

                case 'eolica':
                    energiaAno = consumoMensal * 12;
                    co2Evitado = Math.round(energiaAno * 0.095);
                    produtividade = 18;
                    economiaAgua = 25;
                    reducaoEmissoes = 20;
                    indice = 98;
                    break;

                case 'biodigestor':
                    energiaAno = consumoMensal * 12;
                    co2Evitado = Math.round(energiaAno * 0.120);
                    produtividade = 12;
                    economiaAgua = 17;
                    reducaoEmissoes = 28;
                    indice = 91;
                    break;
            }

            // Atualiza os valores textuais dos cards
            if (resEconomia) resEconomia.textContent = energiaAno.toLocaleString('pt-BR') + ' kWh/ano';
            if (resCo2) resCo2.textContent = co2Evitado.toLocaleString('pt-BR') + ' kg/ano';
            if (resProdutividade) resProdutividade.textContent = produtividade + '%';
            if (resAgua) resAgua.textContent = economiaAgua + '%';
            if (resCarbono) resCarbono.textContent = reducaoEmissoes + '%';
            if (resIndice) resIndice.textContent = indice + '%';

            // Animação das barras de progresso estruturais
            setTimeout(() => {
                if (barraProdutividade) barraProdutividade.style.width = produtividade + '%';
                if (barraAgua) barraAgua.style.width = economiaAgua + '%';
                if (barraCarbono) barraCarbono.style.width = reducaoEmissoes + '%';
                if (barraIndice) barraIndice.style.width = indice + '%';

                if (textoProdutividade) textoProdutividade.textContent = produtividade + '%';
                if (textoAgua) textoAgua.textContent = textoAgua.textContent = economiaAgua + '%';
                if (textoCarbono) textoCarbono.textContent = reducaoEmissoes + '%';
                if (textoIndice) textoIndice.textContent = indice + '%';
            }, 200);

            if (resultadoContainer) {
                resultadoContainer.classList.remove('hidden');
                resultadoContainer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        });
    }

    // LÓGICA DO PAINEL DE CONFIGURAÇÕES 
    const btnConfig = document.getElementById('btn-config');
    const painelConfig = document.getElementById('painel-config');
    const btnTema = document.getElementById('btn-tema');
    const sliderFonte = document.getElementById('slider-fonte');

    if (btnConfig && painelConfig) {
        // 1. Abre e fecha o painel ao clicar na engrenagem
        btnConfig.addEventListener('click', (e) => {
            e.stopPropagation();
            painelConfig.classList.toggle('ativo');
        });

        // 2. Fecha o painel se clicar em qualquer outra parte da tela
        document.addEventListener('click', (e) => {
            if (!painelConfig.contains(e.target) && e.target !== btnConfig) {
                painelConfig.classList.remove('ativo');
            }
        });
    }

    // 3. Alternância do Tema Claro / Escuro
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const modoAtual = document.body.classList.contains('dark-mode') ? 'escuro' : 'claro';
            localStorage.setItem('tema', modoAtual);
        });
    }

    // 4. Controle Dinâmico da Fonte Básica
    let tamanhoFonte = Number(localStorage.getItem('fonte')) || 16;
    document.documentElement.style.setProperty('--fonte-base', tamanhoFonte + 'px');

    if (sliderFonte) {
        sliderFonte.value = tamanhoFonte;
        sliderFonte.addEventListener('input', (e) => {
            tamanhoFonte = e.target.value;
            document.documentElement.style.setProperty('--fonte-base', tamanhoFonte + 'px');
            localStorage.setItem('fonte', tamanhoFonte);
        });
    }

    // LÓGICA DE INTERAÇÃO DO NOVO MODAL DE FONTES BIBLIOGRÁFICAS
    const btnFontes = document.getElementById('btn-fontes');
    const modalFontes = document.getElementById('modal-fontes');
    const fecharModal = document.getElementById('fechar-modal');

    if (btnFontes && modalFontes && fecharModal) {
        // Abre o modal de fontes
        btnFontes.addEventListener('click', () => {
            modalFontes.classList.add('ativo');
        });

        // Fecha ao clicar no botão "X"
        fecharModal.addEventListener('click', () => {
            modalFontes.classList.remove('ativo');
        });

        // Fecha se o usuário clicar na área escura ao redor do modal
        modalFontes.addEventListener('click', (e) => {
            if (e.target === modalFontes) {
                modalFontes.classList.remove('ativo');
            }
        });
    }

}); 