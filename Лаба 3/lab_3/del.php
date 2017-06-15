<?php

$dom = new DOMDocument;
$dom->load('data.xml');
$columns = $dom->getElementsByTagName('column');
$totalMathes = $columns->length;
$nodesToDelete = array();
for ($i=0;$i<$totalMathes;$i++){
    $nodesToDelete[]=$columns->item($i);
}
foreach ($nodesToDelete as $nodeToDelete) {
    echo $nodeToDelete->nodeValue;
    $nodeToDelete->parentNode->removeChild($nodeToDelete);
}
$dom->save('data.xml');
?>