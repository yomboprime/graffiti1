
var renderer = null;
var camera = null;
var scene = null;
var object33 = null;
var orbitControls = null;
var material = null;
var flag = 0;

init();

function init() {

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
//    renderer.shadowMap.enabled = true;
//    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;


    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 50 );
    camera.position.x = 0.;
    camera.position.y = 0.2;
    camera.position.z = 0.45;
	camera.position.multiplyScalar( 10 );

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x707070 );

    var l1 = new THREE.SpotLight( 0xffffff, 1 );
    l1.position.set( -0.5, 1, 0.5 ).multiplyScalar( 6 );
    l1.angle = Math.PI / 5;
    l1.penumbra = 0.05;
    l1.decay = 2;
    l1.distance = 50;
/*
    l1.castShadow = true;
    l1.shadow.mapSize.width = 1024;
    l1.shadow.mapSize.height = 1024;
    l1.shadow.camera.near = 0.1;
    l1.shadow.camera.far = 5;
*/
    scene.add( l1 );

    var l2 = new THREE.SpotLight( 0x0000ff, 1 );
    l2.position.set( 0.2, -0.3, -1.2 ).multiplyScalar( 6 );
    l2.angle = Math.PI / 5;
    l2.penumbra = 0.05;
    l2.decay = 2;
    l2.distance = 50;
/*
    l2.castShadow = true;
    l2.shadow.mapSize.width = 1024;
    l2.shadow.mapSize.height = 1024;
    l2.shadow.camera.near = 0.1;
    l2.shadow.camera.far = 5;
*/
    scene.add( l2 );

/*
    //var material = new THREE.MeshBasicMaterial( { color: new THREE.Color( 0x705060 ) } );
    material = new THREE.MeshStandardMaterial();
    material.roughness = 0.5;
    material.metalness = 1;

    //scene.add( new THREE.Mesh( new THREE.BoxBufferGeometry( 0.2, 0.2, 0.2 ), material ) );

    var cyl1 = new THREE.Mesh( new THREE.CylinderGeometry( 0.16, 0.2, 0.03, 50, 1 ), material );
    cyl1.position.y = -0.1;
    cyl1.castShadow = true;
    cyl1.receiveShadow = true;
    scene.add( cyl1 );

    var cyl2 = new THREE.Mesh( new THREE.CylinderGeometry( 0.13, 0.13, 0.01, 50, 1 ), material );
    cyl2.position.y = -0.085;
    cyl2.castShadow = true;
    cyl2.receiveShadow = true;
    scene.add( cyl2 );
*/

	var group = new THREE.Group();
	group.position.x = -0.5;
	scene.add( group );

	new THREE.MTLLoader()
		.setPath( './' )
		.load( 'untitled.mtl', function ( materials ) {

			materials.preload();

			new THREE.OBJLoader()
				.setMaterials( materials )
				.setPath( './' )
				.load( 'untitled.obj', function ( object ) {

					object.rotation.x = Math.PI * 0.5;
					group.add( object );

				} );

		} );

/*
    var loader = new THREE.OBJLoader();
    loader.load( "untitled.obj", function( object ) {

        object33 = object;
        object33.rotation.x = Math.PI * 0.5;

        object33.traverse( function( object ) {
            if ( object instanceof THREE.Mesh ) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material = material;
            }

        } );

        scene.add( object33 );


    } );
*/

    window.addEventListener( 'resize', onWindowResize, false );

    orbitControls = new THREE.OrbitControls( camera, renderer.domElement  );

    animate();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {

    requestAnimationFrame( animate );

    orbitControls.update();

    renderer.render( scene, camera );

}
