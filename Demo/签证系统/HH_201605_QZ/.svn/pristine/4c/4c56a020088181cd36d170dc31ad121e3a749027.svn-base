<?php
	namespace Common\Util\Sms;
	class Email {
		private $config;
		private $data;
		//$data = array('to' => '收件人邮箱','name' => '收件人名称','subject' => '标题','body' => 'html内容');
		public function __construct($config,$data){
			$this->config = $config;    //传递配置
			$this->data = $data;		//传递数据
		}
		
		public function send() {
			$mail = $this->set_config();
			return $mail->Send() ? true : $mail->ErrorInfo;
		}

		private function set_config(){
			$mail = new \Common\Util\Sms\Email\PHPMailer();                           //PHPMailer对象
			$mail->CharSet = 'UTF-8';                         //设定邮件编码，默认ISO-8859-1，如果发中文此项必须设置，否则乱码
			$mail->IsSMTP();                                   // 设定使用SMTP服务
			$mail->IsHTML(true);                               //可以发送html格式
			$mail->AddEmbeddedImage($src); 						//设置邮件中的图片 		
			$mail->SMTPDebug = 0;                             // 关闭SMTP调试功能 1 = errors and messages2 = messages only
			$mail->SMTPAuth = true;                           // 启用 SMTP 验证功能
			if ($this->config['smtp_port'] == 465)
				$mail->SMTPSecure = 'ssl';                    // 使用安全协议
			$mail->Host = $this->config['smtp_host'];                // SMTP 服务器
			$mail->Port = $this->config['smtp_port'];                // SMTP服务器的端口号
			$mail->Username = $this->config['smtp_user'];           // SMTP服务器用户名
			$mail->Password = $this->config['smtp_pass'];           // SMTP服务器密码
			$mail->SetFrom($this->config['from_email'], $this->config['from_name']);
			$replyEmail = $this->config['reply_email'];
			$replyName = $this->config['reply_name'];
			$mail->AddReplyTo($replyEmail, $replyName);
			$mail->Subject = $this->data['subject'];
			$mail->MsgHTML($this->data['body']);
			$mail->AddAddress($this->data['to'], $this->data['name']);
			return $mail;
		}
	}
?>