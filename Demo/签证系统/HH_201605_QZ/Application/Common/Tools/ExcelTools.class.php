<?php

namespace Common\Tools;
class ExcelTools{
       
   /**
    * 导出数据成一张Excel表
    * 
    * -------------------------------------------------------------------------
    * @param string $data 需要导出的数据，必须
    * @param array() $title 导出的excel表的表头信息，必须
    * @param string $version 导出的excel信息，默认为2007，可选
    * @param string $savefile 导出的excel保存的名字，可选(需要英文，字符串)
    * @param array() $width 导出的excel保存的宽度，必选，最好填写,具体到每列的宽度如$width=array('A'=>10,'B'=>10,'C'=>25,'D'=>20,'E'=>25,'F'=>25,'G'=>25,'H'=>25);
    * @param array(fontfamily,size,color,bold) $font 导出的excel表头的样式,可选(已废弃，损耗性能)
    * @param string $sheetname 导出的excel表的名字，默认为“shee1”，可选
    * 返回值:文件名称$url:如lession.xls
    * -------------------------------------------------------------------
    **/
public function  exportExcel($data,$title=array(),$version='2007',$savefile='',$width='',$font=array('fontfamily'=>
'SimHei','size'=>'12','color'=>'000000','bold'=>'false'),$sheetname='sheet')
{
		ob_end_clean();
		ob_start();        //打开缓冲区
		set_time_limit(0);//多给点时间
		ini_set ('memory_limit', '256M');//设置内存大小
		import("Common.Util.PHPExcel");
		
		//若没有指定文件名则为当前时间戳
		if (empty($savefile)) {
		   $savefile='data';
		}
		//判断版本输出和后缀名
		if($version=='2007'){
			$ext='.xlsx';
		}
		elseif($version=='2005'){
			$ext='.xls';
		}
		else{
			$this->error("输入的版本参数有误!");
		}
		
		
		//若指字了excel表头，则把表单追加到正文内容前面去
		if (is_array($title)) {
			array_unshift($data, $title);
		}
		
		//设置phpexcel缓存
		//$cacheMethod = \PHPExcel_CachedObjectStorageFactory:: cache_to_phpTemp;  
		//$cacheSettings = array( ' memoryCacheSize '  => '20MB');  
		//\PHPExcel_Settings::setCacheStorageMethod($cacheMethod, $cacheSettings); 

		//实例化excel
		$objPHPExcel = new \PHPExcel();
		

		//表示用第$i张表格			
		$obj = $objPHPExcel->setActiveSheetIndex(0);
		
		foreach ($data as $k => $v) {									
			//从第二行插入数据；
			$row = $k+1; //行
			$nn = 0;//列						
			
			foreach ($v as $kk=>$vv) {
				if($nn<26){
					 $col = chr(65 + $nn); //列，其中chr()是把数据转换为ASCII码
					 
					 $obj->setCellValue($col . $row, $vv); //列,行,值

					$obj->getStyle($col.$row)->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //水平居中
					 $nn++;
				}
				else{
				 $col1= chr(65+$nn-26); //列，其中chr()是把数据转换为ASCII码
				 $col=A.$col1;
				 $obj->setCellValue($col.$row, $vv); //列,行,值

				$obj->getStyle($col.$row)->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //水平居中
				 $nn++;
				}
			}
		}
		foreach($width as $k => $v){
			$objPHPExcel->getActiveSheet()->getColumnDimension($k)->setWidth($v);
		}
		
		
		$objPHPExcel->getActiveSheet()->setTitle($sheetname); //题目			


		//$obj->getStyle()->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER); //水平居中
		
	
		//保存到服务器
		$objWriter = \PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
		$filename = $savefile.mt_rand(10,99).mt_rand(100000,999999).mt_rand(100,999).$ext;
		$objWriter->save('Uploads/excel/'.$filename);
		return 'Uploads/excel/'.$filename;			
	}
	/**
	 * 数据表的导入
	 * 
	 * ---------------------------------------------------------
	 * @param 其他 $sheet 导入的excel表
	 * @param 其他 $table 导入到的数据表
	 * @param array（）  $field1 excel表中导入的字段
	 * @param array（） $field2 系统自动导入的字段
	 * @param string $field3 是否设置字段判断数据是否重复
	 * @param string $row 从第几行开始导入，默认从第2行
	 * 
	 * @return array() 返回一个数组ret，得到成功/失败/更新/插入的数量
	 * 
	 * -------------------------------------------------------------
	 */
	public function importExcel($file) {
		//$_FILES['excel'] $file
       if(!empty($file['name'])) {
            $upload = new \Think\Upload();
            $upload->maxSize   =     3145728 ;
            $upload->exts      =     array('xls','xlsx');
            $upload->rootPath  =     './Uploads/'; 
            $upload->savePath  =     'temp/'; 
            $upload->saveName  =     array('uniqid',''); 
            $upload->autoSub   =     false; 
            $result = $upload->uploadOne($file);
            if ($result) {
                $filename = $upload->rootPath.$result['savepath'].$result['savename'];
                import("Common.Util.PHPExcel");
                /**默认用excel2007读取excel，若格式不对，则用之前的版本进行读取*/
                $PHPReader = new \PHPExcel_Reader_Excel2007();
                if (!$PHPReader->canRead($filename)) {
                    $PHPReader = new \PHPExcel_Reader_Excel5();
                    if (!$PHPReader->canRead($filename)) {
                        $this->error('文件上传错误！');
                    }
                }
                $PHPExcel = $PHPReader->load($filename);
                $sheet = $PHPExcel->getSheet(0); 
				return array('status' => 1,'obj' => $sheet,'row' => $sheet->getHighestRow(),'filename' => $filename);
            }else{
                return array('status' => 0,'error_msg' => $upload->getError());
            }
        }else{
            $this->error('请选择文件');
        }
    }

    /**
 * 数据表的导入
 * 
 * ---------------------------------------------------------
 * @param 其他 $sheet 导入的excel表
 * @param array()  $field excel表和数据库对应的字段
 * @return array() 返回一个excel表数组数据
 * 
 * 
 * -------------------------------------------------------------
 */
public function importExcel2($sheet,$field)
    {
        $table = $tablename;
        //总列数
        $allColumn = $sheet->getHighestColumn();
        //将字母列转换成数字列
        $allColumn = \PHPExcel_Cell::columnIndexFromString($allColumn);
        $allRow = $sheet->getHighestRow()+1;
        //遍历excel表
        for($currentRow =2;$currentRow<$allRow;$currentRow++){
            for($currentColumn =0;$currentColumn<$allColumn;$currentColumn++){
            	if($currentColumn==$allColumn-2){
                	$data[$currentRow][$field[$currentColumn]] = date('Y-m',($sheet->getCellByColumnAndRow($currentColumn,$currentRow)->getValue()-25569)*24*60*60);
            		//phpexcel从1900-01-01开始计算，25569代表1900-1-1的数字
            	}elseif($currentColumn==$allColumn-1){
            		$data[$currentRow][$field[$currentColumn]] = date('Y-m-d',($sheet->getCellByColumnAndRow($currentColumn,$currentRow)->getValue()-25569)*24*60*60);
            	}else{
            		$data[$currentRow][$field[$currentColumn]] = $sheet->getCellByColumnAndRow($currentColumn,$currentRow)->getValue();
            	}
            }
        }
        return $data;
    }

}