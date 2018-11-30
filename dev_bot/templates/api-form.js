<?php

namespace Form;

use Ants\Worker\Form;

class __form__Form extends Form {
	public function __construct() {
		$this->setFormRenderer(new \ViewHelper\RegFormRenderer());
		$this->setAttribute('method', 'post');
		$this->add(array(
			'name' => 'id',
			'type' => 'Hidden',
		));
	}

	/**
	 * Set the filter for the form elements
	 */
	public function getInputSpecification() {
		return array(
			// 'required' => true,
			// 'pin' => array(
			// 	'filters' => array(
			// 		array('name' => 'StringTrim'),
			// 		array('name' => 'StripTags'),
			// 	),
			// 	'validators' => array(
			// 		array(
			// 			'name' => 'StaffPinStatus',
			// 			'options' => array(
			// 				'object_repository' => 'Pins',
			// 				'fields' => 'pin',
			// 			),
			// 		),
			// 	),
			// ),
			// 'username' => array(
			// 	'required' => true,
			// 	'filters' => array(
			// 		array('name' => 'StringTrim'),
			// 		array('name' => 'StripTags'),
			// 	),
			// 	'validators' => array(
			// 		array(
			// 			'name' => 'EmailAddress',
			// 			'options' => array(
			// 			),
			// 		),
			// 		array(
			// 			'name' => 'NoRecordExists',
			// 			'options' => array(
			// 				'object_repository' => 'Users',
			// 				'fields' => 'username',
			// 				'messages' => array(
			// 					'objectFound' => 'Username taken. Choose another one.',
			// 				),
			// 			),
			// 		),
			// 	),
			// ),
			// 'pass' => array(
			// 	'required' => true,
			// 	'filters' => array(
			// 		array('name' => 'StringTrim'),
			// 	),
			// 	'validators' => array(
			// 		array(
			// 			'name' => 'Identical',
			// 			'options' => array(
			// 				'token' => 'password',
			// 				'messages' => array(
			// 					'notSame' => 'Password mismatch. Retype.',
			// 				),
			// 			),
			// 		),
			// 	),
			// ),

			// 'phone' => array(
			// 	'required' => true,
			// 	'filters' => array(
			// 		array('name' => 'StringTrim'),
			// 		array('name' => 'StripTags'),
			// 	),
			// 	'validators' => array(
			// 		array(
			// 			'name' => 'Regex',
			// 			'options' => array(
			// 				'pattern' => '/^(0|234|\+234)(7|8|9)(1|0)[0-9]{8}$/',
			// 				'messages' => array(
			// 					'regexNotMatch' => "Value is not a valid MOBILE number!",
			// 				),
			// 			),
			// 		),
			// 		array(
			// 			'name' => 'NoRecordExists',
			// 			'options' => array(
			// 				'object_repository' => 'Users',
			// 				'fields' => 'phone',
			// 				'messages' => array(
			// 					'objectFound' => 'Phone has been used. Use another one.',
			// 				),
			// 			),
			// 		),
			// 	),
            // ),
		);
	}

}
