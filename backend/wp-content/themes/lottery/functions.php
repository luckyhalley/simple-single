<?php
	//add_rewrite_rule('api', '/wp-admin/admin-ajax.php?action=get_article_list');
	add_action( 'wp_ajax_nopriv_get_article_list', 'get_article_list' );
	add_action( 'wp_ajax_get_article_list', 'get_article_list' );
	
	function get_article_list() {
		$posts = query_posts(array('post_type' => 'post'));
		$result = array();
		foreach ($posts as $post) {
			array_push($result, 
					array('id'	 => $post->ID, 
					  'title'  	 => $post->post_title, 
					  'date'  	 => $post->post_date_gmt,
					  'content'  => '',
					)
				);
		}
		$response = json_encode( $result ); 
		header( "Content-Type: application/json" );
		echo $response;
		exit;
	}

	add_action( 'wp_ajax_nopriv_get_article_detail', 'get_article_detail' );
	add_action( 'wp_ajax_get_article_detail', 'get_article_detail' );
	function get_article_detail() {
		$posts = query_posts(array('post_type' => 'post', 'p' => $_REQUEST['id']));		
		$response = json_encode(
			array('id'	 => $posts[0]->ID, 
				  'title'  	 => $posts[0]->post_title, 
				  'date'  	 => $posts[0]->post_date_gmt,
				  'content'  => $posts[0]->post_content,
				)
		); 
		header( "Content-Type: application/json" );
		echo $response;
		exit;
	}