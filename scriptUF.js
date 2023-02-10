function _datatable (idTabela, ordenaColuna, ordenaForma, quantidadePagina = 10){
    $('#' + idTabela).DataTable({
        "order": [[ ordenaColuna, ordenaForma ]],
        "pageLength": quantidadePagina,
        "language": {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "Mostrar _MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        }
    });
}

function _datatableSoExcel (idTabela, ordenaColuna, ordenaForma, tituloPlanilha, quantidadePagina = 10){
    $('#' + idTabela).DataTable({
      "order": [[ ordenaColuna, ordenaForma ]],
      "pageLength": quantidadePagina,
      "language": {
        "decimal": ",",
        "thousands": ".",
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "Mostrar _MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
          "sNext": "Próximo",
          "sPrevious": "Anterior",
          "sFirst": "Primeiro",
          "sLast": "Último"
        },
        "oAria": {
          "sSortAscending": ": Ordenar colunas de forma ascendente",
          "sSortDescending": ": Ordenar colunas de forma descendente"
        }
      },
      "columnDefs": [
        { "type": 'numeric-comma', "targets": 5 }
      ],
      "dom": 'Bfrtip',
      "buttons": 
        [
          {
            extend: 'excel',
            text: 'Gerar Excel',
            title: tituloPlanilha, 
          },
        ],
    });
}



$(document).on('change', '#busca', function(){
    switch($(this).val()){
        case 'cidade':
            $('.escolhaCidade').css('display','block')
            $('.escolhaEndereco').css('display','none')
            $('.escolhaEmpreendimento').css('display','none')
            $('.escolhaEstado').css('display','none')

            break;
        case 'endereco':
            $('.escolhaEndereco').css('display','block')
            $('.escolhaCidade').css('display','none')
            $('.escolhaEmpreendimento').css('display','none')
            $('.escolhaEstado').css('display','none')

            break;
        case 'nome':
            $('.escolhaEmpreendimento').css('display','block')
            $('.escolhaCidade').css('display','none')
            $('.escolhaEndereco').css('display','none')
            $('.escolhaEstado').css('display','none')

            break;
        case 'uf':
            $('.escolhaEstado').css('display','block')
            $('.escolhaCidade').css('display','none')
            $('.escolhaEndereco').css('display','none')
            $('.escolhaEmpreendimento').css('display','none')

            break;
        default:
            // var criticidade = `<td data-order="5" style="font-weight: bold;">${item.PRIORIDADE}</td>`
      }
})

const form = document.querySelector("#formBusca");
const select = document.querySelector("#busca");
const input = document.querySelector("#textoBusca");
const resultados = document.querySelector("#resultados");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Função para remover acentos de uma string
    const removerAcentos = (texto) => {
        texto = texto.toLowerCase();
        texto = texto.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
        texto = texto.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
        texto = texto.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
        texto = texto.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
        texto = texto.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
        texto = texto.replace(new RegExp("[Ç]", "gi"), "c");
        return texto;
    };

    // Filtrar dados de acordo com o texto da busca (ignorando acentos)
    const filtrados = dados.filter((dado) => {
        return (
            removerAcentos(dado[select.value]).includes(
                removerAcentos(input.value)
            )
        );
    });

    // Mostrar dados filtrados na página
    resultados.innerHTML = filtrados
    .map(
        (dado) => `
        <div class="card">
        <img src='foto.png'>
            <div>
                <p><strong>Nome:</strong> ${dado.nome}</p>
                <p><strong>Endereço:</strong> ${dado.endereco}</p>
                <p><strong>Criticidade:</strong> ${dado.criticidade}</p>
                <p><strong>UF:</strong> ${dado.uf}</p>
                <p><strong>Cidade:</strong> ${dado.cidade}</p>
                <p><strong>Observação:</strong> ${dado.observacao}</p>
            </div>
        </div>
        `
    )
    .join("");
});


let statusDoCheckBox = {
    ALTO: false,
    MEDIO: false,
    BAIXO: false
};

function filtraCriticidade(criticidade) {
    statusDoCheckBox[criticidade] = !statusDoCheckBox[criticidade];
    let cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
      let cardCriticidade = card.querySelector("p:nth-child(3)").textContent.split(": ")[1];
      if (statusDoCheckBox["ALTO"] && (cardCriticidade === "ALTO" || cardCriticidade === "MUITO ALTO")) {
        card.style.display = "block";
      } else if (statusDoCheckBox["MEDIO"] && cardCriticidade === "MEDIO") {
        card.style.display = "block";
      } else if (statusDoCheckBox["BAIXO"] && (cardCriticidade === "BAIXO" || cardCriticidade === "MUITO BAIXO")) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }


function mascaraValor(valor) {
    valor = valor.toString().replace(/\D/g,"");
    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
    return valor                    
}

$( document ).ready(function() {
    $('.loadingPagina').css('display', 'block')

    function uniqueByKey(dados, key) {
        return [...new Map(dados.map((x) => [x[key], x])).values()];
    }
    
    // SELECT ESTADOS
    var estados = uniqueByKey(dados, 'UF');

    estados.forEach(function(valores, index){
        var opcao = 
        `
            <option value="${valores.UF}">${valores.UF}</option>
        `
        $(opcao).appendTo('#selectEstado');
    })

    ordenarSelect('selectEstado')

    var opcaoDisabled = `<option disabled selected>Selecione o Estado</option>`
    $(opcaoDisabled).appendTo('#selectEstado');
    // FIM SELECT ESTADOS

    // SELECT CIDADES
    var cidades = uniqueByKey(dados, 'CIDADE');

    cidades.forEach(function(valores, index){
        var opcao = 
        `
            <option class="${valores.UF}dados optionsCidades" value="${valores.CIDADE}">${valores.CIDADE}</option>
        `
        $(opcao).appendTo('#selectCidades');
    })

    ordenarSelect('selectCidades')

    var opcaoDisabled = `<option class="selecioneCidade" disabled selected>Selecione a Cidade</option>`
    $(opcaoDisabled).appendTo('#selectCidades');

    var opcaoTodasCidades = `<option class="todasCidades d-none" selected value="todasCidades">TODAS AS CIDADES</option>`
    $(opcaoTodasCidades).appendTo('#selectCidades');
    // FIM SELECT CIDADES

    // SELECT EMPREENDIMENTOS
    var empreendimentos = uniqueByKey(dados, 'EMPREENDIMENTO');

    empreendimentos.forEach(function(valores, index){
        var opcao = 
        `
            <option value="${valores.idDfi}">${valores.EMPREENDIMENTO}</option>
        `
        $(opcao).appendTo('#selectEmprendimentos');
    })

    ordenarSelect('selectEmprendimentos')

    var opcaoDisabled = `<option disabled selected>Selecione a Empreendimento</option>`
    $(opcaoDisabled).appendTo('#selectEmprendimentos');
    // FIM SELECT EMPREENDIMENTOS

    $(document).on('change', '#selectEstado', function(){
        $('.escolhaCidade').css('display','none')
        $('.optionsCidades').css('display','none')
        $('.selecioneCidade').css('display','none')
        $('.todasCidades').removeClass('d-none');
        $('.todasCidades').prop('selected', true);
       
        var estadoSelecionado = $(this).val();

        $(`.${estadoSelecionado}dados`).css('display','block')
        $('.escolhaCidade').css('display','block');
        $('.opcoesCidades').css('display','block');

        $('#tblDadosUF').DataTable().clear().destroy();
        
        dados.forEach(function(item, index){

            var estadoBancoDados = item.UF

            if (estadoSelecionado == estadoBancoDados){

                $('#dadosUF').css('display','block');
                switch(item.PRIORIDADE){
                    case 'MUITO ALTO':
                      var criticidade = `<td class='${item.UF} grauCriticidade' data-order="0" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                      break;
                    case 'ALTO':
                      var criticidade = `<td class='${item.UF} grauCriticidade' data-order="1" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                      break;
                    case 'MEDIO':
                      var criticidade = `<td class='${item.UF} grauCriticidade' data-order="2" style="color:orange; font-weight: bold;">${item.PRIORIDADE}</td>`
                      break;
                    case 'BAIXO':
                      var criticidade = `<td class='${item.UF} grauCriticidade' data-order="3" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                      break;
                    case 'MUITO BAIXO':
                      var criticidade = `<td class='${item.UF} grauCriticidade' data-order="4" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                      break;
                    default:
                      var criticidade = `<td class='${item.UF} grauCriticidade' data-order="5" style="font-weight: bold;">${item.PRIORIDADE}</td>`
                  }

                var linha =
                    `<tr> 
                        <td class='${item.UF}'>${item.UF}</td> 
                        <td class='${item.UF}'>${item.CIDADE}</td> 
                        <td class='${item.UF}'>ENDERECO</td> 
                        <td class='${item.UF}'>${item.EMPREENDIMENTO}</td> 
                        <td class='${item.UF}'>${item.TIPO_DE_DANO}</td> 
                        ${criticidade} 
                        <td class='${item.UF}'>${item.DATA_ORIGEM}</td> 
                        <td class='${item.UF}'>${item.updated_at}</td> 
                        <td class='${item.UF}'>${item.statusDFI}</td> 
                        <td class='${item.UF}'>PRAZO</td>
                        <td class='${item.UF}'>
                            <a class="btn btn-primary btn-sm" href="empreendimento.html?id=${item.idDfi}" role="button" onclick="detalhamentoEmpreendimento(${item.idDfi})">Detalhamento</a>
                        </td>
                    </tr>`;

                $(linha).appendTo('#tblDadosUF>tbody');
            
            } else{
                $('.'+`${item.UF}`).remove();
            }
        });
            
        _datatableSoExcel('tblDadosUF', '5', 'asc', 'imoveis_concorrencia_publica_licitacao_aberta_par', 10)

        $(document).on('change', '#selectCidades', function(){
            $('#tblDadosUF').DataTable().clear().destroy();
            
            var cidadeEscolhida = $(this).val()

            dados.forEach(function(item, index){

                if(cidadeEscolhida === 'todasCidades'){

                    var estadoBancoDados = item.UF

                    if (estadoSelecionado == estadoBancoDados){
                        $('#dadosUF').css('display','block');
                        switch(item.PRIORIDADE){
                            case 'MUITO ALTO':
                            var criticidade = `<td class='${item.UF} grauCriticidade' data-order="0" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                            break;
                            case 'ALTO':
                            var criticidade = `<td class='${item.UF} grauCriticidade' data-order="1" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                            break;
                            case 'MEDIO':
                            var criticidade = `<td class='${item.UF} grauCriticidade' data-order="2" style="color:orange; font-weight: bold;">${item.PRIORIDADE}</td>`
                            break;
                            case 'BAIXO':
                            var criticidade = `<td class='${item.UF} grauCriticidade' data-order="3" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                            break;
                            case 'MUITO BAIXO':
                            var criticidade = `<td class='${item.UF} grauCriticidade' data-order="4" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                            break;
                            default:
                            var criticidade = `<td class='${item.UF} grauCriticidade' data-order="5" style="font-weight: bold;">${item.PRIORIDADE}</td>`
                        }

                        var linha =
                            `<tr> 
                                <td class='${item.UF}'>${item.UF}</td> 
                                <td class='${item.UF}'>${item.CIDADE}</td> 
                                <td class='${item.UF}'>ENDERECO</td> 
                                <td class='${item.UF}'>${item.EMPREENDIMENTO}</td> 
                                <td class='${item.UF}'>${item.TIPO_DE_DANO}</td> 
                                ${criticidade} 
                                <td class='${item.UF}'>${item.DATA_ORIGEM}</td> 
                                <td class='${item.UF}'>${item.updated_at}</td> 
                                <td class='${item.UF}'>${item.statusDFI}</td> 
                                <td class='${item.UF}'>PRAZO</td>
                                <td class='${item.UF}'>
                                    <a class="btn btn-primary btn-sm" href="empreendimento.html?id=${item.idDfi}" role="button" onclick="detalhamentoEmpreendimento(${item.idDfi})">Detalhamento</a>
                                </td> 
                            </tr>`;

                        $(linha).appendTo('#tblDadosUF>tbody');
                    
                    } else{
                        $('.'+`${item.UF}`).remove();
                    }

                }else{
                    var cidadeBancoDados = item.CIDADE
                    var cidadeSemEspaco = cidadeBancoDados.replace(/\s/g, '');
    
                    if (cidadeEscolhida == cidadeBancoDados){
    
                        $('#dadosUF').css('display','block');
                        switch(item.PRIORIDADE){
                            case 'MUITO ALTO':
                              var criticidade = `<td class='${cidadeSemEspaco} grauCriticidade' data-order="0" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                              break;
                            case 'ALTO':
                              var criticidade = `<td class='${cidadeSemEspaco} grauCriticidade' data-order="1" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                              break;
                            case 'MEDIO':
                              var criticidade = `<td class='${cidadeSemEspaco} grauCriticidade' data-order="2" style="color:orange; font-weight: bold;">${item.PRIORIDADE}</td>`
                              break;
                            case 'BAIXO':
                              var criticidade = `<td class='${cidadeSemEspaco} grauCriticidade' data-order="3" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                              break;
                            case 'MUITO BAIXO':
                              var criticidade = `<td class='${cidadeSemEspaco} grauCriticidade' data-order="4" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                              break;
                            default:
                              var criticidade = `<td class='${cidadeSemEspaco} grauCriticidade' data-order="5" style="font-weight: bold;">${item.PRIORIDADE}</td>`
                          }
    
                        var linha =
                            `<tr> 
                                <td class='${cidadeSemEspaco}'>${item.UF}</td> 
                                <td class='${cidadeSemEspaco}'>${item.CIDADE}</td> 
                                <td class='${cidadeSemEspaco}'>ENDERECO</td> 
                                <td class='${cidadeSemEspaco}'>${item.EMPREENDIMENTO}</td> 
                                <td class='${cidadeSemEspaco}'>${item.TIPO_DE_DANO}</td> 
                                ${criticidade} 
                                <td class='${cidadeSemEspaco}'>${item.DATA_ORIGEM}</td> 
                                <td class='${cidadeSemEspaco}'>${item.updated_at}</td> 
                                <td class='${cidadeSemEspaco}'>${item.statusDFI}</td> 
                                <td class='${cidadeSemEspaco}'>PRAZO</td>
                                <td class='${cidadeSemEspaco}'>
                                    <a class="btn btn-primary btn-sm" href="empreendimento.html?id=${item.idDfi}" role="button" onclick="detalhamentoEmpreendimento(${item.idDfi})">Detalhamento</a>
                                </td>
                            </tr>`;
    
                        $(linha).appendTo('#tblDadosUF>tbody');
                    
                    } else{
                        $('.'+cidadeSemEspaco).remove();
                    }
                }
            
            });
            
            _datatableSoExcel('tblDadosUF', '5', 'asc', 'imoveis_par_dfi', 10)

        });
    })

    $(document).on('change', '#selectEmprendimentos', function(){

        $('#tblDadosUF').DataTable().clear().destroy();
        
        var empreendimentoEscolhido = $(this).val()

        dados.forEach(function(item, index){
            
            var empreendimentoBancoDados = item.idDfi
            var empreendimentoSemEspaco = empreendimentoBancoDados.replace(/\s/g, '');

            if (empreendimentoEscolhido == empreendimentoSemEspaco){

                $('#dadosUF').css('display','block');
                switch(item.PRIORIDADE){
                    case 'MUITO ALTO':
                        var criticidade = `<td class='${empreendimentoSemEspaco} grauCriticidade' data-order="0" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                        break;
                    case 'ALTO':
                        var criticidade = `<td class='${empreendimentoSemEspaco} grauCriticidade' data-order="1" style="color:red; font-weight: bold;">${item.PRIORIDADE}</td>`
                        break;
                    case 'MEDIO':
                        var criticidade = `<td class='${empreendimentoSemEspaco} grauCriticidade' data-order="2" style="color:orange; font-weight: bold;">${item.PRIORIDADE}</td>`
                        break;
                    case 'BAIXO':
                        var criticidade = `<td class='${empreendimentoSemEspaco} grauCriticidade' data-order="3" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                        break;
                    case 'MUITO BAIXO':
                        var criticidade = `<td class='${empreendimentoSemEspaco} grauCriticidade' data-order="4" style="color:green; font-weight: bold;">${item.PRIORIDADE}</td>`
                        break;
                    default:
                        var criticidade = `<td class='${empreendimentoSemEspaco} grauCriticidade' data-order="5" style="font-weight: bold;">${item.PRIORIDADE}</td>`
                    }

                var linha =
                    `<tr> 
                        <td class='${empreendimentoSemEspaco}'>${item.UF}</td> 
                        <td class='${empreendimentoSemEspaco}'>${item.CIDADE}</td> 
                        <td class='${empreendimentoSemEspaco}'>ENDERECO</td> 
                        <td class='${empreendimentoSemEspaco}'>${item.EMPREENDIMENTO}</td> 
                        <td class='${empreendimentoSemEspaco}'>${item.TIPO_DE_DANO}</td> 
                        ${criticidade} 
                        <td class='${empreendimentoSemEspaco}'>${item.DATA_ORIGEM}</td> 
                        <td class='${empreendimentoSemEspaco}'>${item.updated_at}</td> 
                        <td class='${empreendimentoSemEspaco}'>${item.statusDFI}</td> 
                        <td class='${empreendimentoSemEspaco}'>PRAZO</td>
                        <td class='${empreendimentoSemEspaco}'>
                            <a class="btn btn-primary btn-sm" href="empreendimento.html?id=${item.idDfi}" role="button" onclick="detalhamentoEmpreendimento(${item.idDfi})">Detalhamento</a>
                        </td>
                    </tr>`;

                $(linha).appendTo('#tblDadosUF>tbody');
            
            } else{
                $('.'+empreendimentoSemEspaco).remove();
            }
        
        });
        
        _datatableSoExcel('tblDadosUF', '5', 'asc', 'imoveis_par_dfi', 10)

    });

    $('.loadingPagina').css('display', 'none')
   
})

function ordenarSelect(id_componente)
{
    var selectToSort = jQuery('#' + id_componente);
    var optionActual = selectToSort.val();
    selectToSort.html(selectToSort.children('option').sort(function (a, b) {
        return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
    })).val(optionActual);
}
