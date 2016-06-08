<?php
namespace Common\TagLib;
use Think\Template\TagLib;
/**
 * RBAC 增强标签库
 * @author 阿莫大侠 <[ mojiannan@honghaiweb.com ]>
 */
class Mo extends TagLib {
    /**
     * 定义标签列表
     *id    html id属性，直接输出
     *class html class属性，直接输出
     *link  html link属性，可以输入U方法，u方法传值时，数组的=>要改成==
     *attr  html 扩展属性，如code="code" 标签内直接输出属性
     *href  html href属性，为空则赋值javascript:void(0)，可以输入U方法，u方法传值时，数组的=>要改成==
     *title html title属性，直接输出
     *node  RBAC RBAC的节点，为空则从link或者href的U方法里面获取url
     */
    protected $tags = array(
        'a'   => array('attr' => 'id,class,link,attr,href,title,node'), //支持的属性
        'rbac'=> array('attr' => 'node'), //支持的属性
    );

    public function _a($tag, $content) {
        $id     =    $tag['id'];
        $class  =    $tag['class'];
        $link   =    $tag['link'];
        $attr   =    $tag['attr'];
        $href   =    $tag['href'];
        $title   =    $tag['title'];
        $node   =    $tag['node'];

        if (empty($node)) {
            $temp = !empty($link)? $link:$href;
            $node = strchr($temp,"(");
            $node = strtok($node, ")");
            $node = strtok($node, ",");
            $node = substr($node,2,-1);
        }
        if (!check_rbac($node)) return false;
        
        //组装url
        if (empty($href)) {
            $href = 'javascript:void(0)'; 
        }elseif('{:'==substr($href,0,2)){
            $href = substr($href,2,-1);
            $href = str_replace('==','=>',$href);
            $href = '<?php echo ' . $href . '?>';
        }
        //组装link
        if (!empty($link)&&'{:'==substr($link,0,2)) {
            $link = substr($link,2,-1);
            $link = str_replace('==','=>',$link);
            $link = '<?php echo ' . $link . '?>';
        }
     

        $parse  = '<a href="'.$href.'"';
        !empty($id)    && $parse .= ' id="'.$id.'"';
        !empty($class) && $parse .= ' class="'.$class.'"';
        !empty($title) && $parse .= ' title="'.$title.'"';
        !empty($link)  && $parse .= ' link="'.$link.'"';
        !empty($attr)  && $parse .= ' '.$attr;
        $parse .= '>'.$content.'</a>';
        return $parse;
    }

    public function _rbac($tag, $content)
    {
        $node   =    $tag['node'];
        if('$' == substr($node,0,1)) {
            $parseStr   =   '<?php if(check_rbac('.$node.')): ?>'.$content.'<?php endif; ?>';
        }else{
            if (!check_rbac($node)) return false;
            $parseStr = $content;
        }
        return $parseStr;
    }
    
}