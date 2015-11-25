<?php

add_action( 'after_setup_theme', 'foundit_setup' );
add_action( 'wp_enqueue_scripts', 'foundit_scripts' );
add_action( 'widgets_init', 'abraham_widgets' );

require get_stylesheet_directory() . '/inc/html-classes.php';
//require get_stylesheet_directory() . '/inc/compatibility.php';
//require get_stylesheet_directory() . '/inc/hooks.php';
require get_stylesheet_directory() . '/inc/shortcodes.php'; // Shortcodes
require get_stylesheet_directory() . '/inc/shorts-ui.php';  // Shortcake interface


function foundit_setup() {

    add_theme_support(
        'custom-background',
        array(
            'default-color' => 'E9EBE7',
            'default-image' => '',
        )
    );
    add_filter( 'theme_mod_primary_color', 'foundit_primary_color' );
    add_filter( 'theme_mod_secondary_color', 'foundit_secondary_color' );
    add_filter( 'theme_mod_accent_color', 'foundit_accent_color' );

}


add_action( 'wp_enqueue_scripts', 'meh_remove_scripts', 20 );
function meh_remove_scripts() {
    wp_dequeue_style( 'parent' );
}

/**
 * Enqueue scripts and styles.
 */
function foundit_scripts() {
    wp_enqueue_script(
        'foundation_scripts',
        trailingslashit(get_stylesheet_directory_uri())."assets/js/foundation.min.js",
        array( 'jquery' ), null, true
    );

    wp_enqueue_script(
        'main_scripts',
        trailingslashit(get_stylesheet_directory_uri())."assets/js/foundit.min.js",
        array( 'abraham_js' ), null, true
    );
}


function foundit_primary_color($hex) {
    return $hex ? $hex : '2199E8';
}
function foundit_secondary_color($hex) {
    return $hex ? $hex : '009688';
}
function foundit_accent_color($hex) {
    return $hex ? $hex : 'C62828';
}

function abraham_widgets() {
    register_sidebar(array(
        'id'            => 'primary',
        'name'          => __( 'Primary', 'abraham' ),
        'before_title'  => '<div class="mdl-card__title u-mtn2 u-mxn2"><h2 class="mdl-card__title-text widget-title">',
        'after_title'   => '</h2></div>',
        'before_widget' => '<section class="mdl-card mdl-cell mdl-shadow--2dp u-p2 u-list-reset">',
        'after_widget'  => '</section>',
    ));

    register_sidebar(array(
        'id'            => 'footer',
        'name'          => __( 'Footer', 'abraham' ),
        'before_widget' => '<section class="mdl-mega-footer__drop-down-section u-p2 u-flexed-grow"><div>',
        'before_title'  => '</div><input class="mdl-mega-footer__heading-checkbox u-1/1" type="checkbox" checked><h2 class="widget-title u-mt0 mdl-mega-footer--heading">',
        'after_title'   => '</h2><div class="mdl-mega-footer--link-list">',
        'after_widget'  => '</div></section>',
    ));

    register_sidebar(array(
        'id'            => 'drawer',
        'name'          => __( 'Drawer Widgets', 'abraham' ),
        'before_title'  => '<h3 class="mdl-card__title-text widget-title">',
        'after_title'   => '</h3>',
        'before_widget' => '<section class="u-p2 u-list-reset %2$s">',
        'after_widget'  => '</section>',
        'class'         => '',
    ));
}
