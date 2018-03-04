/**
 * /* eslint-disable no-multi-spaces
 *
 * @format
 */

/**
 * External dependencies
 */
import { forEach } from 'lodash';
import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Internal dependencies
 */
import Dialog from 'components/dialog';
import FormButton from 'components/forms/form-button';

class HelpModal extends React.Component {
	static propTypes = {
		onClose: PropTypes.func,
		macosx: PropTypes.bool,
		showDialog: PropTypes.bool,
	};

	defaultShortcuts = () => {
		const { translate } = this.props;
		return [
			[ 'c', translate( 'Copy' ), 'x', translate( 'Cut' ) ],
			[ 'v', translate( 'Paste' ), 'a', translate( 'Select all' ) ],
			[ 'z', translate( 'Undo' ), 'y', translate( 'Redo' ) ],
			[ 'b', translate( 'Bold' ), 'i', translate( 'Italic' ) ],
			[ 'u', translate( 'Underline' ), 'k', translate( 'Insert/edit link' ) ],
		];
	};

	additionalShortcuts = () => {
		const { translate } = this.props;
		return [
			[ 1, translate( 'Heading 1' ), 2, translate( 'Heading 2' ) ],
			[ 3, translate( 'Heading 3' ), 4, translate( 'Heading 4' ) ],
			[ 5, translate( 'Heading 5' ), 6, translate( 'Heading 6' ) ],
			[ 'l', translate( 'Align left' ), 'c', translate( 'Align center' ) ],
			[ 'r', translate( 'Align right' ), 'j', translate( 'Justify' ) ],
			[ 'd', translate( 'Strikethrough' ), 'q', translate( 'Blockquote' ) ],
			[ 'u', translate( 'Bulleted list' ), 'o', translate( 'Numbered list' ) ],
			[ 'a', translate( 'Insert/edit link' ), 's', translate( 'Remove link' ) ],
			[ 'm', translate( 'Insert/edit image' ), 't', translate( 'Insert Read More tag' ) ],
			[ 'h', translate( 'Keyboard Shortcuts' ), 'x', translate( 'Code' ) ],
			[ 'p', translate( 'Insert Page Break tag' ) ],
		];
	};

	spaceFormatShortcuts = () => {
		const { translate } = this.props;
		return [
			[ '*', translate( 'Bulleted list' ), '1.', translate( 'Numbered list' ) ],
			[ '-', translate( 'Bulleted list' ), '1)', translate( 'Numbered list' ) ],
		];
	};

	enterFormatShortcuts = () => {
		const { translate } = this.props;
		return [
			[ '>', translate( 'Blockquote' ), '##', translate( 'Heading 2' ) ],
			[ '###', translate( 'Heading 3' ), '####', translate( 'Heading 4' ) ],
			[ '#####', translate( 'Heading 5' ), '######', translate( 'Heading 6' ) ],
			[ '---', translate( 'Horizontal line' ) ],
		];
	};

	renderRow = ( row, rowIndex ) => {
		let columns = [];
		forEach( row, ( cell, cellIndex ) => {
			if ( cellIndex % 2 === 0 ) {
				columns.push(
					<th className="wpcom-help__key" key={ cell }>
						<kbd>{ cell }</kbd>
					</th>
				);
			} else {
				columns.push(
					<td className="wpcom-help__action" key={ cell }>
						{ cell }
					</td>
				);
			}
		} );

		return <tr key={ rowIndex }>{ columns }</tr>;
	};

	getButtons = () => {
		return [
			<FormButton key="close" isPrimary={ false } onClick={ this.props.onClose }>
				{ this.props.translate( 'Close' ) }
			</FormButton>,
		];
	};

	getKeyLabel = () => {
		return this.props.translate( 'Key', { context: 'Computer key used in keyboard shortcut' } );
	};

	getActionLabel = () => {
		return this.props.translate( 'Action', {
			context: 'Action taken when pressing keyboard shortcut',
		} );
	};

	getTableHead = () => {
		return (
			<thead>
				<tr>
					<th className="wpcom-help__key">{ this.getKeyLabel() }</th>
					<th className="wpcom-help__action">{ this.getActionLabel() }</th>
					<th className="wpcom-help__key">{ this.getKeyLabel() }</th>
					<th className="wpcom-help__action">{ this.getActionLabel() }</th>
				</tr>
			</thead>
		);
	};

	render() {
		const translate = this.props.translate;
		const defaultText = this.props.macosx
			? translate( 'Default shortcuts, Command + key:', { context: 'Mac shortcuts' } )
			: translate( 'Default shortcuts, Ctrl + key:', { context: 'Windows shortcuts' } );

		const additionalText = this.props.macosx
			? translate( 'Additional shortcuts, Control + Option + key:', {
					context: 'Mac shortcuts',
				} )
			: translate( 'Additional shortcuts, Shift + Alt + key:', {
					context: 'Windows shortcuts',
				} );

		const tableHead = this.getTableHead();

		return (
			<Dialog
				isVisible={ this.props.showDialog }
				buttons={ this.getButtons() }
				additionalClassNames="wpcom-help__dialog"
				onClose={ this.props.onClose }
			>
				<h2 className="wpcom-help__heading">{ translate( 'Keyboard Shortcuts' ) }</h2>
				<p>{ defaultText }</p>
				<table className="wpcom-help__table">
					{ tableHead }
					<tbody>{ this.defaultShortcuts().map( this.renderRow, this ) }</tbody>
				</table>
				<p>{ additionalText }</p>
				<table className="wpcom-help__table">
					{ tableHead }
					<tbody>{ this.additionalShortcuts().map( this.renderRow, this ) }</tbody>
				</table>
				<p>{ translate( 'Formatting shortcuts, key, then space:' ) }</p>
				<table className="wpcom-help__table">
					{ tableHead }
					<tbody>{ this.spaceFormatShortcuts().map( this.renderRow, this ) }</tbody>
				</table>
				<p>{ translate( 'Formatting shortcuts, key, then Enter:' ) }</p>
				<table className="wpcom-help__table">
					{ tableHead }
					<tbody>{ this.enterFormatShortcuts().map( this.renderRow, this ) }</tbody>
				</table>
			</Dialog>
		);
	}
}

export default localize( HelpModal );
