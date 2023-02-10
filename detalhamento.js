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

$( document ).ready(function() {
  $('.loadingPagina').css('display', 'block')
  
  // fetch('dados')
  // .then(Response => Response.json())
  // .then(dados =>{
  const params = new URLSearchParams(window.location.search)
  
  const id = parseInt(params.get('id'))
  // let registroEncontrado

  // dados.forEach(function(item, index){
    
  //   if(item.idDfi === id){
  //     registroEncontrado = index
  //     return false
  //   }
  // })

  const registroEncontrado = dados.find(function(registro){
    return registro.idDfi ===id
  })
  

  $('#nomeEmpreendimento').html(registroEncontrado.EMPREENDIMENTO)

  $('.loadingPagina').css('display', 'none')

})
 