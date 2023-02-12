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
  
  const params = new URLSearchParams(window.location.search)
  
  const id = parseInt(params.get('id'))

  dados.forEach(function(item, index) {
    let idDados = item.idDfi
    if (idDados == id) {
      switch(item.PRIORIDADE){
        case 'MUITO ALTO':
          var criticidade = `<b style="color:red;">${item.PRIORIDADE}</b>`
          break;
        case 'ALTO':
          var criticidade = `<b style="color:red;">${item.PRIORIDADE}</b>`
          break;
        case 'MEDIO':
          var criticidade = `<b style="color:orange;">${item.PRIORIDADE}</b>`
          break;
        case 'BAIXO':
          var criticidade = `<b style="color:green;">${item.PRIORIDADE}</b>`
          break;
        case 'MUITO BAIXO':
          var criticidade = `<b style="color:green;">${item.PRIORIDADE}</b>`
          break;
        default:
          var criticidade = `<b style=">${item.PRIORIDADE}</b>`
      }

      $('#nomeEmpreendimento').html(item.EMPREENDIMENTO)
      $('#nomeCidade').html(`<b>${item.CIDADE}</b>`)
      $('#nomeUF').html(`<b>${item.UF}</b>`)
      $('#nomeDano').html(`<b>${item.TIPO_DE_DANO}</b>`)
      $('#nomeCriticidade').html(criticidade)
      $('#nomeDataOrigem').html(`<b>${item.DATA_ORIGEM}</b>`)
      $('#nomeStatus').html(`<b>${item.statusDFI}</b>`)
      // $('#nomeUF').html(item.UF)
      // $('#nomeUF').html(item.UF)
    }
  });
  
  $('.loadingPagina').css('display', 'none')

})
 