function calcularViabilidade() {
    const valorCompra = parseFloat(document.getElementById("valor-compra").value) || 0;
    const quantidade = parseInt(document.getElementById("quantidade").value) || 0;
    const freteCompra = parseFloat(document.getElementById("frete-compra").value) || 0;
    const freteEntrega = parseFloat(document.getElementById("frete-entrega").value) || 0;
    const impostos = parseFloat(document.getElementById("impostos").value) || 0;
    const valorProposta = parseFloat(document.getElementById("valor-proposta").value) || 0;
    const precoMaxEdital = parseFloat(document.getElementById("preco-max-edital").value) || 0;
    const prazoPagamento = parseInt(document.getElementById("prazo-pagamento").value) || 0;
    const custoCapital = parseFloat(document.getElementById("custo-capital").value) || 0;
    const margemDesejada = parseFloat(document.getElementById("margem-desejada").value) || 0;
    
    const receitaBruta = valorProposta * quantidade;
    const valorImpostos = receitaBruta * (impostos / 100);
    const custoTotal = (valorCompra * quantidade) + freteCompra + freteEntrega;
    const custoFinanceiro = custoTotal * (custoCapital / 100) * (prazoPagamento / 30);
    const lucroLiquido = receitaBruta - custoTotal - custoFinanceiro - valorImpostos;
    if (receitaBruta === 0) {
        document.getElementById("resultado").innerHTML = "Por favor, informe o valor da proposta e a quantidade.";
        return;
    }
    const margemLiquida = (lucroLiquido / receitaBruta) * 100;
    console.log(receitaBruta, valorImpostos, custoTotal, custoFinanceiro, lucroLiquido, margemLiquida);
    if (impostos >= 100) {
        document.getElementById("resultado").innerHTML = "A alíquota de impostos não pode ser igual ou superior a 100%.";
        return;
    }
    const precoMinimo = (custoTotal + custoFinanceiro) / (quantidade * (1 - impostos / 100));
    if (margemDesejada > 0 && impostos + margemDesejada >= 100) {
        document.getElementById("resultado").innerHTML = "A soma da alíquota de impostos e da margem desejada não pode ser igual ou superior a 100%.";
        return;
    }
    const parteComMargem = 1 - (impostos / 100) - (margemDesejada / 100);
    const precoMinimoComMargem = (custoTotal + custoFinanceiro) / (quantidade * parteComMargem);
    let veredito = "";
    if (lucroLiquido <= 0) {
        veredito = "<strong>Não é vantajoso entrar na disputa</strong>, pois o lucro líquido é zero ou negativo.";
    } else if (precoMaxEdital > 0 && precoMinimo > precoMaxEdital) {
        veredito = "<strong>Não é vantajoso entrar na disputa</strong>, nem o preço máximo do edital cobre seus custos.";
    } else if (precoMaxEdital > 0 && valorProposta > precoMaxEdital) {
        veredito = "<strong>Atenção</strong>, a proposta está acima do preço máximo do edital e pode ser desclassificada.";
    } else if (margemDesejada > 0 && margemLiquida < margemDesejada) {
        veredito = "<strong>Viável</strong>, mas com margem abaixo da desejada.";
    } else {
        veredito = "<strong>É vantajoso entrar na disputa!</strong>";
    }
    let linhaMargem= "";
    if (margemDesejada > 0) {
        linhaMargem = `<p>Preço Mínimo com margem desejada: ${formatarMoeda(precoMinimoComMargem)}</p>`;
    }
    document.getElementById("resultado").innerHTML = `
    <p>${veredito}</p>
    <p>Receita: ${formatarMoeda(receitaBruta)}</p>
    <p>Impostos: ${formatarMoeda(valorImpostos)}</p>
    <p>Custo Total: ${formatarMoeda(custoTotal)}</p>
    <p>Custo Financeiro: ${formatarMoeda(custoFinanceiro)}</p>
    <p>Lucro Líquido: ${formatarMoeda(lucroLiquido)}</p>
    <p>Margem Líquida: ${margemLiquida.toFixed(2)}%</p>
    <p>Preço Mínimo sem prejuízo: ${formatarMoeda(precoMinimo)}</p>
    ${linhaMargem}
`;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}