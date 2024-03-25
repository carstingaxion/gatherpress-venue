<?php
/**
 * Plugin Name:       Gatherpress venue block
 * Description:       An experiment to replace the `gatherpress/venue` block with a block-variation.
 * Version:           0.1.0-alpha
 * Requires at least: 6.5-RC2
 * Requires PHP:      7.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gatherpress-venue
 *
 * @package           create-block
 */

namespace GatherPressVenueBlock;

use GatherPress\Core\Event;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Start the engines.
 *
 * @return void
 */
function bootstrap(): void {

	require_once __DIR__ . '/includes/core/classes/class-venue.php';
	require_once __DIR__ . '/includes/query-loop.php';

	\add_action( 'init', __NAMESPACE__ . '\\register_assets', 1 );

	\add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_assets' );

	// \add_action( 'after_setup_theme', 'twentytwentytwo_support' );

	// \add_filter( 'render_block_core/query', __NAMESPACE__ . '\\debug_query_block', 10, 3 );
		
	add_filter( 'the_title', function ( $title, $id = null ) {

		$post = \get_post($id);
	
		return sprintf(
			'<pre>%s:%s</pre> %s',
			$post->post_type,
			$post->ID,
			$title
		);
	}, 10, 2 );
}
bootstrap();


/**
 * Get backend-only editor assets.
 *
 * @return string[]
 */
function get_editor_assets(): array {
	return [
	// 'venue',
	];
}


/**
 * 
 *
 * @return void
 */
function register_assets(): void {

	\array_map(
		__NAMESPACE__ . '\\register_asset',
		\array_merge(
			get_editor_assets(),
			[
				'variations',
			]
		)
	);
}

/**
 * Enqueue all scripts.
 *
 * @return void
 */
function enqueue_assets(): void {
	\array_map(
		__NAMESPACE__ . '\\enqueue_asset',
		// get_editor_assets()
		[
			'variations',
		]
	);


	/*
		* Load additional block styles.
		*/
	$block_name = 'query-variation--venue';
	$index_css = "build/variations/variations.css";
	$args = array(
		'handle' => "gp-$block_name",
		// 'src'    => get_theme_file_uri( "assets/css/blocks/$block_name.css" ),
		'src'    => plugins_url( $index_css, __FILE__ ),
	);
	wp_enqueue_block_style( "core/post-template", $args );
	// wp_enqueue_style( $args['handle'], $args['src'] );
}

/**
 * Enqueue a script.
 *
 * @param  string $asset Slug of the block to load the frontend scripts for.
 *
 * @return void
 */
function enqueue_asset( string $asset ): void {
	wp_enqueue_script( "gatherpress-venue--$asset" );
	// wp_enqueue_style( "gatherpress-venue--$asset" );
}


/**
 * Register a new script and sets translated strings for the script.
 *
 * @throws \Error If build-files doesn't exist errors out in local environments and writes to error_log otherwise.
 *
 * @param  string $asset Slug of the block to register scripts and translations for.
 *
 * @return void
 */
function register_asset( string $asset ): void {

	$dir = __DIR__;

	$script_asset_path = "$dir/build/$asset/$asset.asset.php";

	
	if ( ! \file_exists( $script_asset_path ) ) {
		$error_message = "You need to run `npm start` or `npm run build` for the '$asset' block-asset first.";
		if ( \in_array( wp_get_environment_type(), [ 'local', 'development' ], true ) ) {
			throw new \Error( esc_html( $error_message ) );
		} else {
			// Should write to the \error_log( $error_message ); if possible.
			return;
		}
	}

	$index_js     = "build/$asset/$asset.js";
	$script_asset = require $script_asset_path; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	\wp_register_script(
		"gatherpress-venue--$asset",
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	$index_css = "build/$asset/$asset.css";
	\wp_register_style(
		"gatherpress-venue--$asset",
		plugins_url( $index_css, __FILE__ ),
		[ 'wp-block-post-date','global-styles' ],
		time(),
		'screen'
	);
	wp_set_script_translations(
		"gatherpress-venue--$asset",
		'gatherpress',
		"$dir/languages"
	);
}



/**
 * Filter the render_block
 *
 * @param string $block_content The content being rendered by the block.
 */
function debug_query_block( $block_content, $parsed_block, $block_instance ) {
	if ( ! isset( $parsed_block['blockName'] ) || 'core/query' !== $parsed_block['blockName'] ) {
		return $block_content;
	}


	if ( ! isset( $parsed_block['attrs']['className'] ) || false === \strpos( $parsed_block['attrs']['className'], 'gp-venue-v2' ) ) {
		return $block_content;
	}

	// $block_content = $block_content . '<pre>' . var_export( $parsed_block, true ) . '</pre>';

	return $block_content;
}


