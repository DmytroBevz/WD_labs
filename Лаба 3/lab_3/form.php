<?php 

    if (file_exists('data.xml')) 
    { 
        $id = $_POST['id'];
        $val = $_POST['val'];

        $xml = new DOMDocument("1.0");
        $xml->load("data.xml");

        $root = $xml->getElementsByTagName("columns")->item(0);
        $column = $xml->createElement("column");
        $root->appendChild($column);

        $column->setAttribute("id",$id);

        $val = $xml->createTextNode($val);
        $column->appendChild($val);

        $xml->formatOutput = true;
        $xml->save('data.xml');
    } 

?> 