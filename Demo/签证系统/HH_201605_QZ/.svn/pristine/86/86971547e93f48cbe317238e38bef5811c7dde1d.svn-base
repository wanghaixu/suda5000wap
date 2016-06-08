<?php

namespace Common\Tools;
class PdfTools{      
   /**
    * 导出一张二维码
    * 
    * -------------------------------------------------------------------------
    * @param string $content  需打印的内容
    ** @param string $word  图片描述内容
    * @param string orientation属性用来设置文档打印格式是“Portrait”还是“Landscape”。 L为横式打印，P为纵向打印,默认为P
    * @param string $Format  设置打印格式，一般设置为A4
    * @param string $Unit  pt：点为单位，mm：毫米为单位，cm：厘米为单位，in：英尺为单位，默认mm
    * @param string $Encoding：设置编码格式，默认为utf-8
    * @param string $picurl:图片路径,可选。可为无图
    * @param string $num:一页A4纸打印多少个二维码,默认1
    * @param string $name:文件名
    * -------------------------------------------------------------------
    **/
public function  exportPDF($content,$picurl,$size=1,$word,$name="pdf1",$orientation="P",$Unit="mm",$Format="A4",$Encoding="utf-8"){ 
    import("Vendor.tcpdf.tcpdf");
    $pdf=new \tcpdf($orientation,$Unit, $Format, true, $Encoding, false); 
    // 设置文档信息 
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor('ttqiwu.com');
    $pdf->SetTitle('Welbcome to ttqiwu.com');
    $pdf->SetSubject('ttqiwu.com PDF');
    $pdf->SetKeywords('ttqiwu.com PDF');
    // 设置页眉和页脚信息 
    $pdf->SetHeaderData('', 30, 'ttqiwu.com', '',array(0,64,255), array(0,64,128)); 
    $pdf->setFooterData(array(0,64,0), array(0,64,128));  
    // 设置页眉和页脚字体 
    $pdf->setHeaderFont(Array('helvetica', '', '10')); 
    $pdf->setFooterFont(Array('helvetica', '', '8'));  
    // 设置默认等宽字体 
    $pdf->SetDefaultMonospacedFont('courier'); 
    // 设置间距 
    $pdf->SetMargins(15, 27, 15); 
    $pdf->SetHeaderMargin(5); 
    $pdf->SetFooterMargin(10);  
    // 设置分页 
    $pdf->SetAutoPageBreak(TRUE, 25); 
    // set image scale factor 
    $pdf->setImageScale(1.25);  
    // set default font subsetting mode 
    $pdf->setFontSubsetting(true); 
    //设置字体 
    $pdf->SetFont('stsongstdlight', '', 14); 
    $pdf->AddPage();
    $pdf->setJPEGQuality(75);
    //$pdf->Write(0,$content,'', 0, 'L', true, 0, false, false, 0); 
    if(!empty($picurl)){
        switch($size){
                case 1:
                    $leng=200;
                    $num=1;
                    break;
                case 2:
                    $leng=105;
                    $num=2;
                    break;
                case 3:
                    $leng=80;
                    $num=2;
                    break;
                case 4:
                    $leng=100;
                    $num=2;
                    break;
                case 5:
                    $leng=80;
                    $num=2;
                    break;
                case 6:
                    $leng=80;
                    $num=2;
                    break;
                case 7:
                    $leng=70;
                    $num=3;
                    break;
                case 8:
                    $leng=70;
                    $num=3;
                    break;
                case 9:
                    $leng=70;
                    $num=3;
                    break;
                case 10:
                    $leng=50;
                    $num=4;
                    break;
                case 11:
                    $leng=50;
                    $num=4;
                    break;
                case 12:
                    $leng=50;
                    $num=4;
                    break;
                case 13:
                    $leng=50;
                    $num=4;
                    break;
                case 14:
                    $leng=50;
                    $num=4;
                    break;
                case 15:
                    $leng=50;
                    $num=4;
                    break;
                case 16:
                    $leng=50;
                    $num=4;
                    break;
            }
                for($i=1;$i<=$size;$i++){
                    $pdf->SetXY(100,100);
                    switch($size){
                        case 1:
                            $pdf->Image(C('WEB_ROOT').$picurl,5,20,$leng,$leng);
                            $pdf->Text(90,200,$word);
                            break;
                        case 2:
                            if($i%$num==0){
                                $pdf->Image(C('WEB_ROOT').$picurl,5,20,$leng,$leng);
                                $pdf->Text(45,115,$word);
                            }else{
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*$i+20,$leng,$leng);
                                $pdf->Text(150,220,$word);
                            }
                            break;
                        case 3:
                            if($i%$num==0){
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng+5,20,$leng,$leng);
                                $pdf->Text(30,180,$word);
                            }else{
                                if($i-2<0){
                                    $sign=0;
                                }else{
                                    $sign=$i-2;
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,5,$leng*$sign+20,$leng,$leng);
                                $pdf->Text(30,95,$word);
                                $pdf->Text(110,95,$word);
                            }
                            break;
                        case 4:
                        $pdf->Text(35,110,$word);
                        $pdf->Text(135,110,$word);
                        $pdf->Text(35,210,$word);
                            if($i%$num==0){
                                if($i-3<0){
                                    $sign=0;
                                }else{
                                    $sign=$i-3;
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*$sign+20,$leng,$leng);
                        $pdf->Text(135,210,$word);
                            }else{
                                if($i-2<0){
                                    $sign=0;
                                }else{
                                    $sign=$i-2;
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*$sign+20,$leng,$leng); 
                            }
                            break;
                        case 5:
                            $pdf->Text(25,95,$word);
                            $pdf->Text(100,95,$word);
                            $pdf->Text(25,175,$word);
                            $pdf->Text(100,175,$word);
							$pdf->Text(25,260,$word);
                            if($i%$num==0){
                                    if($i-3<0){
                                        $sign=0;
                                    }else{
                                        $sign=$i-3;
                                    }
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*$sign+20,$leng,$leng);
                                }else{
                                    if($i-2<0){
                                        $sign=0;
                                    }else{
                                        if($i-3==0){
                                            $sign=1;
                                        }else{
                                            $sign=$i-3;
                                        }
                                    }
									
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*$sign+20,$leng,$leng);
                            }
                            break;
                        case 6:
                        $pdf->Text(25,95,$word);
                        $pdf->Text(100,95,$word);
                        $pdf->Text(25,175,$word);
                        $pdf->Text(100,175,$word);
                        $pdf->Text(25,260,$word);
                        $pdf->Text(100,260,$word);
                            if($i%$num==0){
                                if($i-3<0){
                                    $sign=0;
                                }else{
                                    if($i-4==0){
                                        $sign=1;
                                    }else{
                                        $sign=$i-4;
                                    }
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*$sign+20,$leng,$leng);
                            }else{
                                if($i-2<0){
                                    $sign=0;
                                }else{
                                    if($i-3==0){
                                        $sign=1;
                                    }else{
                                        $sign=$i-3;
                                    }
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*$sign+20,$leng,$leng);
                            }
                            break;
                        case 7:
                        $pdf->Text(25,85,$word);
                        $pdf->Text(90,85,$word);
                        $pdf->Text(160,85,$word);
                        $pdf->Text(25,155,$word);
                        $pdf->Text(90,155,$word);
                        $pdf->Text(160,155,$word);
                        $pdf->Text(25,230,$word);
                            if($i%$num==0){
                                if($i-3==0){
                                    $sign=0;
                                }else{
                                    $sign=$i-5;
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*$sign+20,$leng,$leng);
                            }else{
                                if($i%2==0){
                                    if($i-2==0){
                                        $b=1;
                                        $sign=0;
                                    }else{
                                        $b=0;
                                        $sign=1;
                                    }
                                }else{
                                    if($i%5==0){
                                        $b=1;
                                        $sign=1;
                                    }else{
                                        $b=0;
                                        if($i-1==0){
                                            $sign=0;
                                        }else{
                                            $sign=$i-5;
                                        }
                                    }
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng*$b,$leng*$sign+20,$leng,$leng);
                            }
                            break;
                        case 8:
                        $pdf->Text(25,85,$word);
                        $pdf->Text(90,85,$word);
                        $pdf->Text(160,85,$word);
                        $pdf->Text(25,155,$word);
                        $pdf->Text(90,155,$word);
                        $pdf->Text(160,155,$word);
                        $pdf->Text(25,230,$word);
                        $pdf->Text(90,230,$word);
                            if($i%$num==0){
                                if($i-3==0){
                                    $sign=0;
                                }else{
                                    $sign=$i-5;
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*$sign+20,$leng,$leng);
                            }else{
                                if($i%2==0){
                                    if($i-4==0){
                                        $b=0;
                                        $sign=1;
                                    }else{
                                        if($i-2==0){
                                            $b=1;
                                            $sign=0;
                                        }else{
                                            $b=1;
                                            $sign=2;
                                        }
                                    }
                                }else{
                                    if($i%5==0){
                                        $b=1;
                                        $sign=1;
                                    }else{
                                        $b=0;
                                        if($i-1==0){
                                            $sign=0;
                                        }else{
                                            $sign=$i-5;
                                        }
                                    }
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng*$b,$leng*$sign+20,$leng,$leng);
                            }
                            break;
                        case 9:
                        $pdf->Text(25,85,$word);
                        $pdf->Text(90,85,$word);
                        $pdf->Text(160,85,$word);
                        $pdf->Text(25,155,$word);
                        $pdf->Text(90,155,$word);
                        $pdf->Text(160,155,$word);
                        $pdf->Text(25,230,$word);
                        $pdf->Text(90,230,$word);
                        $pdf->Text(160,230,$word);
                            if($i%$num==0){
                                if($i-3==0){
                                    $sign=0;
                                }else{
                                    if($i-6==0){
                                        $sign=1;
                                    }else{
                                        $sign=2;
                                    }
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*$sign+20,$leng,$leng);
                            }else{
                                if($i%2==0){
                                    if($i-4==0){
                                        $b=0;
                                        $sign=1;
                                    }else{
                                        if($i-2==0){
                                            $b=1;
                                            $sign=0;
                                        }else{
                                            $b=1;
                                            $sign=2;
                                        }
                                    }
                                }else{
                                    if($i%5==0){
                                        $b=1;
                                        $sign=1;
                                    }else{
                                        $b=0;
                                        if($i-1==0){
                                            $sign=0;
                                        }else{
                                            $sign=$i-5;
                                        }
                                    }
                                }
                                $pdf->Image(C('WEB_ROOT').$picurl,$leng*$b,$leng*$sign+20,$leng,$leng);
                            }
                            break;
                        case 10:
                            $pdf->Text(20,65,$word);
                            $pdf->Text(70,65,$word);
                            $pdf->Text(120,65,$word);
                            $pdf->Text(170,65,$word);
                            $pdf->Text(20,115,$word);
                            $pdf->Text(70,115,$word);
                            $pdf->Text(120,115,$word);
                            $pdf->Text(170,115,$word);
                            $pdf->Text(20,165,$word);
                            $pdf->Text(70,170,$word);
                             switch($i){
                                case 1:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,20,$leng,$leng);
                                    break;
                                case 2:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,20,$leng,$leng);
                                    break;
                                case 3:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,20,$leng,$leng);
                                    break;
                                case 4:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,20,$leng,$leng);
                                    break;
                                case 5:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng+20,$leng,$leng);
                                    break;
                                case 6:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng+20,$leng,$leng);
                                    break;
                                case 7:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng+20,$leng,$leng);
                                    break;
                                case 8:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng+20,$leng,$leng);
                                    break;
                                case 9:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*2+20,$leng,$leng);
                                    break;
                                case 10:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*2+20,$leng,$leng);
                                    break;
                            } 
                            break;
                        case 11:
                        $pdf->Text(20,65,$word);
                        $pdf->Text(70,65,$word);
                        $pdf->Text(120,65,$word);
                        $pdf->Text(170,65,$word);
                        $pdf->Text(20,115,$word);
                        $pdf->Text(70,115,$word);
                        $pdf->Text(120,115,$word);
                        $pdf->Text(170,115,$word);
                        $pdf->Text(20,165,$word);
                        $pdf->Text(70,170,$word);
                        $pdf->Text(120,170,$word);
                            switch($i){
                                case 1:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,20,$leng,$leng);
                                    break;
                                case 2:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,20,$leng,$leng);
                                    break;
                                case 3:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,20,$leng,$leng);
                                    break;
                                case 4:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,20,$leng,$leng);
                                    break;
                                case 5:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng+20,$leng,$leng);
                                    break;
                                case 6:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng+20,$leng,$leng);
                                    break;
                                case 7:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng+20,$leng,$leng);
                                    break;
                                case 8:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng+20,$leng,$leng);
                                    break;
                                case 9:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*2+20,$leng,$leng);
                                    break;
                                case 10:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*2+20,$leng,$leng);
                                    break;
                                case 11:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*2+20,$leng,$leng);
                                    break;
                            }
                            break;
                        case 12:
                        $pdf->Text(20,65,$word);
                        $pdf->Text(70,65,$word);
                        $pdf->Text(120,65,$word);
                        $pdf->Text(170,65,$word);
                        $pdf->Text(20,115,$word);
                        $pdf->Text(70,115,$word);
                        $pdf->Text(120,115,$word);
                        $pdf->Text(170,115,$word);
                        $pdf->Text(20,165,$word);
                        $pdf->Text(70,170,$word);
                        $pdf->Text(120,170,$word);
                        $pdf->Text(170,170,$word);
                            switch($i){
                                case 1:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,20,$leng,$leng);
                                    break;
                                case 2:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,20,$leng,$leng);
                                    break;
                                case 3:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,20,$leng,$leng);
                                    break;
                                case 4:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,20,$leng,$leng);
                                    break;
                                case 5:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng+20,$leng,$leng);
                                    break;
                                case 6:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng+20,$leng,$leng);
                                    break;
                                case 7:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng+20,$leng,$leng);
                                    break;
                                case 8:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng+20,$leng,$leng);
                                    break;
                                case 9:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*2+20,$leng,$leng);
                                    break;
                                case 10:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*2+20,$leng,$leng);
                                    break;
                                case 11:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*2+20,$leng,$leng);
                                    break;
                                case 12:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng*2+20,$leng,$leng);
                                    break;
                            }
                            break;
                        case 13:
                        $pdf->Text(20,65,$word);
                        $pdf->Text(70,65,$word);
                        $pdf->Text(120,65,$word);
                        $pdf->Text(170,65,$word);
                        $pdf->Text(20,115,$word);
                        $pdf->Text(70,115,$word);
                        $pdf->Text(120,115,$word);
                        $pdf->Text(170,115,$word);
                        $pdf->Text(20,165,$word);
                        $pdf->Text(70,170,$word);
                        $pdf->Text(120,170,$word);
                        $pdf->Text(170,170,$word);
                        $pdf->Text(20,220,$word);
                            switch($i){
                                case 1:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,20,$leng,$leng);
                                    break;
                                case 2:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,20,$leng,$leng);
                                    break;
                                case 3:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,20,$leng,$leng);
                                    break;
                                case 4:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,20,$leng,$leng);
                                    break;
                                case 5:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng+20,$leng,$leng);
                                    break;
                                case 6:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng+20,$leng,$leng);
                                    break;
                                case 7:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng+20,$leng,$leng);
                                    break;
                                case 8:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng+20,$leng,$leng);
                                    break;
                                case 9:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*2+20,$leng,$leng);
                                    break;
                                case 10:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*2+20,$leng,$leng);
                                    break;
                                case 11:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*2+20,$leng,$leng);
                                    break;
                                case 12:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng*2+20,$leng,$leng);
                                    break;
                                case 13:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*3+20,$leng,$leng);
                                    break;
                            }
                            break;
                        case 14:
                        $pdf->Text(20,65,$word);
                        $pdf->Text(70,65,$word);
                        $pdf->Text(120,65,$word);
                        $pdf->Text(170,65,$word);
                        $pdf->Text(20,115,$word);
                        $pdf->Text(70,115,$word);
                        $pdf->Text(120,115,$word);
                        $pdf->Text(170,115,$word);
                        $pdf->Text(20,165,$word);
                        $pdf->Text(70,170,$word);
                        $pdf->Text(120,170,$word);
                        $pdf->Text(170,170,$word);
                        $pdf->Text(20,220,$word);
                        $pdf->Text(70,220,$word);
                            switch($i){
                                case 1:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,20,$leng,$leng);
                                    break;
                                case 2:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,20,$leng,$leng);
                                    break;
                                case 3:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,20,$leng,$leng);
                                    break;
                                case 4:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,20,$leng,$leng);
                                    break;
                                case 5:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng+20,$leng,$leng);
                                    break;
                                case 6:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng+20,$leng,$leng);
                                    break;
                                case 7:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng+20,$leng,$leng);
                                    break;
                                case 8:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng+20,$leng,$leng);
                                    break;
                                case 9:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*2+20,$leng,$leng);
                                    break;
                                case 10:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*2+20,$leng,$leng);
                                    break;
                                case 11:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*2+20,$leng,$leng);
                                    break;
                                case 12:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng*2+20,$leng,$leng);
                                    break;
                                case 13:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*3+20,$leng,$leng);
                                    break;
                                case 14:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*3+20,$leng,$leng);
                                    break;
                            }
                            break;
                        case 15:
                        $pdf->Text(20,65,$word);
                        $pdf->Text(70,65,$word);
                        $pdf->Text(120,65,$word);
                        $pdf->Text(170,65,$word);
                        $pdf->Text(20,115,$word);
                        $pdf->Text(70,115,$word);
                        $pdf->Text(120,115,$word);
                        $pdf->Text(170,115,$word);
                        $pdf->Text(20,165,$word);
                        $pdf->Text(70,170,$word);
                        $pdf->Text(120,170,$word);
                        $pdf->Text(170,170,$word);
                        $pdf->Text(20,220,$word);
                        $pdf->Text(70,220,$word);
                        $pdf->Text(120,220,$word);
                            switch($i){
                                case 1:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,20,$leng,$leng);
                                    break;
                                case 2:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,20,$leng,$leng);
                                    break;
                                case 3:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,20,$leng,$leng);
                                    break;
                                case 4:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,20,$leng,$leng);
                                    break;
                                case 5:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng+20,$leng,$leng);
                                    break;
                                case 6:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng+20,$leng,$leng);
                                    break;
                                case 7:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng+20,$leng,$leng);
                                    break;
                                case 8:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng+20,$leng,$leng);
                                    break;
                                case 9:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*2+20,$leng,$leng);
                                    break;
                                case 10:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*2+20,$leng,$leng);
                                    break;
                                case 11:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*2+20,$leng,$leng);
                                    break;
                                case 12:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng*2+20,$leng,$leng);
                                    break;
                                case 13:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*3+20,$leng,$leng);
                                    break;
                                case 14:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*3+20,$leng,$leng);
                                    break;
                                case 15:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*3+20,$leng,$leng);
                                    break;
                            }
                            break;
                        case 16:
                        $pdf->Text(20,65,$word);
                        $pdf->Text(70,65,$word);
                        $pdf->Text(120,65,$word);
                        $pdf->Text(170,65,$word);
                        $pdf->Text(20,115,$word);
                        $pdf->Text(70,115,$word);
                        $pdf->Text(120,115,$word);
                        $pdf->Text(170,115,$word);
                        $pdf->Text(20,165,$word);
                        $pdf->Text(70,170,$word);
                        $pdf->Text(120,170,$word);
                        $pdf->Text(170,170,$word);
                        $pdf->Text(20,220,$word);
                        $pdf->Text(70,220,$word);
                        $pdf->Text(120,220,$word);
                        $pdf->Text(170,220,$word);
                            switch($i){
                                case 1:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,20,$leng,$leng);
                                    break;
                                case 2:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,20,$leng,$leng);
                                    break;
                                case 3:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,20,$leng,$leng);
                                    break;
                                case 4:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,20,$leng,$leng);
                                    break;
                                case 5:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng+20,$leng,$leng);
                                    break;
                                case 6:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng+20,$leng,$leng);
                                    break;
                                case 7:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng+20,$leng,$leng);
                                    break;
                                case 8:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng+20,$leng,$leng);
                                    break;
                                case 9:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*2+20,$leng,$leng);
                                    break;
                                case 10:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*2+20,$leng,$leng);
                                    break;
                                case 11:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*2+20,$leng,$leng);
                                    break;
                                case 12:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng*2+20,$leng,$leng);
                                    break;
                                case 13:
                                    $pdf->Image(C('WEB_ROOT').$picurl,0,$leng*3+20,$leng,$leng);
                                    break;
                                case 14:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng,$leng*3+20,$leng,$leng);
                                    break;
                                case 15:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*2,$leng*3+20,$leng,$leng);
                                    break;
                                case 16:
                                    $pdf->Image(C('WEB_ROOT').$picurl,$leng*3,$leng*3+20,$leng,$leng);
                                    break;
                            }
                            break;
                    }
                }                 
        }
    //输出PDF 
    $pdf->Output($name."pdf", 'D');
    }    
}
