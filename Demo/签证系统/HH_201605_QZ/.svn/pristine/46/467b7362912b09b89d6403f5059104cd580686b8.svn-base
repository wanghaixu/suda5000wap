<?php

namespace Common\Tools;
class CityTools{
	//传入省
    public function city($province){
		$str = $this->get_city($province);
		return $str;
	}

	//传入地区
	public function area($city){
		$str = $this->get_area($city);
		return $str;
	}

	private function get_city($province){
		$city = M('appprovincedistrict')->where(array('pd_province' => $province))->distinct(true)->field('pd_city_name')->select();
		$str = '';
		$str .= '<select name="info[pd_city_name]" id="s2" class="cur-poi">';
		foreach($city as $key => $val){
			$str .= '<option>'.$val['pd_city_name'].'</option>';
		}
		$str .= '</select>';
		$str .= $this->get_area($city[0]['pd_city_name']);
		return $str;
	}

	private function get_area($city){
		$area = M('appprovincedistrict')->where(array('pd_city_name' => $city))->field('pd_district_name')->select();
		if($area[0]['pd_district_name']){
			$str .='<select name="info[pd_district_name]" id="s3" class="cur-poi">';
			foreach($area as $k => $v){
				$str .= '<option>'.$v['pd_district_name'].'</option>';
			}
			$str .= '</select>';
		}
		return $str;
	}
}