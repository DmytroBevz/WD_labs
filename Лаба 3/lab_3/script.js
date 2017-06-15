$(document).ready(function() {
  col_numb = 0;
  value = 0;

  $.post('del.php');
  createGraph('#data-table','.chart');
  function createGraph(table, container) {
    $.get('data.xml',function(xml) {
            $('table tbody tr').remove();
            $('table thead tr').remove();
            $('<tr></tr>').appendTo('table tbody');
            $('<tr></tr>').appendTo('table thead');
            $(xml).find('column').each(function(){
              var td = $('<td></td>').appendTo('table tbody tr');
              td.text($(this).text());
              var th = $('<th></th>').appendTo('table thead tr');
              th.text($(this).attr("id"));
            })             
          });
    var bars = [];
    var figureContainer = $('<div id="figure"></div>');
    var graphContainer = $('<div class="graph"></div>');
    var barContainer = $('<div class="bars"></div>');
    var container = $(container);
    var chartData;    
    var chartYMax;
    var columnGroups;
    var table = $(table);
    
    // Timer variables
    var barTimer;
    var graphTimer;
    $('#figure').remove();
    $('#graph').remove();
    $('#bars').remove();
    
    var data = {
      chartData: function() {
        var chartData = [];
        table.find('tbody tr td').each(function() {
          chartData.push($(this).text());
        });
        return chartData;
      },
      chartYMax: function() {
        var chartData = this.chartData();
        var chartYMax = Math.ceil(Math.max.apply(Math, chartData) / 100) * 100;
        return chartYMax;
      },
      yLegend: function() {
        var chartYMax = this.chartYMax();
        var yLegend = [];
        var yAxisMarkings = 5;     
        if (chartYMax!= -Infinity)       
          for (var i = 0; i < yAxisMarkings; i++) {
            yLegend.unshift(((chartYMax * i) / (yAxisMarkings - 1)));
          }
        else
          for (var i = 0; i < yAxisMarkings; i++) {
            yLegend.unshift("");
          }
        return yLegend;
      },
      xLegend: function() {
        var xLegend = [];
        table.find('thead tr th').each(function() {
          xLegend.push($(this).text());
        });
        return xLegend;
      },
      columnGroups: function() {
        var columnGroups = [];
        var columns = chartData.length;
        for (var i = 0; i < columns; i++) {
          table.find('tbody tr td').each(function() {
            columnGroups.push($(this).find('td').eq(i).text());
          });
        }
        return columnGroups;
      }
    }
       
    chartData = data.chartData();    
    chartYMax = data.chartYMax();
    
    for (var j = 0, k = chartData.length; j < k; j++) {
      var barGroup = $('<div class="bar-group"></div>');
      var barObj = {};
      barObj.label = chartData[j];
      barObj.height = Math.floor(barObj.label / chartYMax * 100) + '%';
      barObj.bar = $('<div class="bar fig"><span>' + barObj.label + '</span></div>')
        .appendTo(barGroup);
      bars.push(barObj);
      barGroup.appendTo(barContainer);
    }
    
    var xLegend = data.xLegend();    
    var xAxisList = $('<ul class="x-axis"></ul>');
    $.each(xLegend, function(i) {     
      var listItem = $('<li><span>' + this + '</span></li>')
        .appendTo(xAxisList);
    });
    xAxisList.appendTo(graphContainer);
    
    var yLegend = data.yLegend();
    var yAxisList = $('<ul class="y-axis"></ul>');
    $.each(yLegend, function(i) {     
      var listItem = $('<li><span>' + this + '</span></li>')
        .appendTo(yAxisList);
    });
    yAxisList.appendTo(graphContainer);   
    
    barContainer.appendTo(graphContainer);    
    
    graphContainer.appendTo(figureContainer);
    
    figureContainer.appendTo(container);
    
    function displayGraph(bars, i) {
      if (i < bars.length) {
        $(bars[i].bar).css({'height': bars[i].height, '-webkit-transition': 'all 0.8s ease-out'});
        barTimer = setTimeout(function() {
          i++;        
          displayGraph(bars, i);
        }, 100);
      }
    }

    function resetGraph() {
      $.each(bars, function(i) {
        $(bars[i].bar).stop().css({'height': 0, '-webkit-transition': 'none'});
      });
      
      clearTimeout(barTimer);
      clearTimeout(graphTimer);
        
      graphTimer = setTimeout(function() {    
        displayGraph(bars, 0);
      }, 200);
    }

    $('#reset-graph-button').click(function() {
      $.post('del.php');
      $('table tbody tr').remove();
      $('table thead tr').remove();
      col_numb = 0;
      return false;
    });
    
    
    resetGraph();
    setTimeout(function() { createGraph('#data-table','.chart');},3000);
  } 
  $('#add-column-button').click(function add(){
      value = 1 + Math.floor(Math.random() * 100);
      $.post('form.php', {id : ++col_numb, val : value });
      return false;
  });
});
