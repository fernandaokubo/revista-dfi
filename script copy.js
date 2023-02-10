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

const form = document.querySelector("form");
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


// function mascaraValor(valor) {
//   valor = valor.toString().replace(/\D/g,"");
//   valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
//   valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
//   valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
//   return valor                    
// }

// $( document ).ready(function() {
//   $('.loadingPagina').css('display', 'block')
    
//   dados.forEach(function(item, index){
//     var venda = item.VALOR_VENDA
//     var valorMinimo = venda.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"});

//     // if (item.NU_IMOVEL == '240021088' || item.NU_IMOVEL == '240020073') {
//     //   var tipoLeilao = 'LICITAÇÃO ABERTA'
//     // } else {
//     //   var tipoLeilao = 'CONCORRÊNCIA PÚBLICA'
//     // }
    
//     var valorFormatado = mascaraValor(venda.toFixed(2))
//     var linha =
//       `
//         <tr> 
//           <td>${item.UF}</td> 
//           <td>${item.CIDADE}</td> 
//           <td>${item.ENDERECO_IMOVEL} - ${item.CEP}</td> 
//           <td>${item.EMPREENDIMENTO}</td> 
//           <td>${item.NU_IMOVEL}</td> 
//           <td>${valorFormatado}</td> 
//           <td>${item.AGRUPAMENTO}</td> 
//           <td>
//             <a href="${item.LINK}" target="_blank" class="btn btn-sm m-auto" role="button" style="background-color: #005ca9; color: white;">
//               <small>Acesse o link</small>
//             </a>
//           </td> 
//         </tr>
//       `;
      
//     $(linha).appendTo('#tblImoveisPar>tbody');
//   });

//   // _datatable('tblImoveisPar', '0', 'asc', 10)
//   _datatableSoExcel('tblImoveisPar', '5', 'asc', 'imoveis_concorrencia_publica_licitacao_aberta_par', 10)
//   $('.loadingPagina').css('display', 'none')
   
// })