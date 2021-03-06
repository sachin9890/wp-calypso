/** @format */

/**
 * Internal dependencies
 */
import {
	bookConciergeAppointment,
	cancelConciergeAppointment,
	rescheduleConciergeAppointment,
	requestConciergeAvailableTimes,
	requestConciergeAppointmentDetails,
	updateConciergeAvailableTimes,
	updateConciergeAppointmentDetails,
	updateConciergeBookingStatus,
	updateConciergeSignupForm,
} from '../actions';

import {
	CONCIERGE_AVAILABLE_TIMES_REQUEST,
	CONCIERGE_AVAILABLE_TIMES_UPDATE,
	CONCIERGE_APPOINTMENT_CANCEL,
	CONCIERGE_APPOINTMENT_CREATE,
	CONCIERGE_APPOINTMENT_DETAILS_REQUEST,
	CONCIERGE_APPOINTMENT_DETAILS_UPDATE,
	CONCIERGE_APPOINTMENT_RESCHEDULE,
	CONCIERGE_SIGNUP_FORM_UPDATE,
	CONCIERGE_UPDATE_BOOKING_STATUS,
} from 'state/action-types';

describe( 'state/concierge', () => {
	describe( 'actions', () => {
		test( 'bookConciergeAppointment()', () => {
			const scheduleId = 123;
			const beginTimestamp = 1234567890;
			const customerId = 1;
			const siteId = 2;
			const meta = { test: 'testing' };

			expect(
				bookConciergeAppointment( scheduleId, beginTimestamp, customerId, siteId, meta )
			).toEqual( {
				type: CONCIERGE_APPOINTMENT_CREATE,
				scheduleId,
				beginTimestamp,
				customerId,
				siteId,
				meta,
			} );
		} );

		test( 'cancelConciergeAppointment()', () => {
			const scheduleId = 123;
			const appointmentId = 1;

			expect( cancelConciergeAppointment( scheduleId, appointmentId ) ).toEqual( {
				type: CONCIERGE_APPOINTMENT_CANCEL,
				scheduleId,
				appointmentId,
			} );
		} );

		test( 'rescheduleConciergeAppointment()', () => {
			const scheduleId = 123;
			const beginTimestamp = 1234567890;
			const appointmentId = 1;
			const appointmentDetails = { meta: { timezone: 'UTC' } };

			expect(
				rescheduleConciergeAppointment(
					scheduleId,
					appointmentId,
					beginTimestamp,
					appointmentDetails
				)
			).toEqual( {
				type: CONCIERGE_APPOINTMENT_RESCHEDULE,
				scheduleId,
				appointmentId,
				beginTimestamp,
				appointmentDetails,
			} );
		} );

		test( 'requestConciergeAvailableTimes()', () => {
			const scheduleId = 123;

			expect( requestConciergeAvailableTimes( scheduleId ) ).toEqual( {
				type: CONCIERGE_AVAILABLE_TIMES_REQUEST,
				scheduleId,
			} );
		} );

		test( 'updateConciergeAvailableTimes()', () => {
			const availableTimes = [ 111, 222, 333 ];

			expect( updateConciergeAvailableTimes( availableTimes ) ).toEqual( {
				type: CONCIERGE_AVAILABLE_TIMES_UPDATE,
				availableTimes,
			} );
		} );

		test( 'updateConciergeSignupForm()', () => {
			const signupForm = { timezone: 'UTC', message: 'hello there' };

			expect( updateConciergeSignupForm( signupForm ) ).toEqual( {
				type: CONCIERGE_SIGNUP_FORM_UPDATE,
				signupForm,
			} );
		} );

		test( 'updateConciergeBookingStatus()', () => {
			const status = 'booking';

			expect( updateConciergeBookingStatus( status ) ).toEqual( {
				type: CONCIERGE_UPDATE_BOOKING_STATUS,
				status,
			} );
		} );

		test( 'requestConciergeAppointmentDetails()', () => {
			const scheduleId = 1;
			const appointmentId = 2;

			expect( requestConciergeAppointmentDetails( scheduleId, appointmentId ) ).toEqual( {
				type: CONCIERGE_APPOINTMENT_DETAILS_REQUEST,
				scheduleId,
				appointmentId,
			} );
		} );

		test( 'updateConciergeAppointmentDetails()', () => {
			const appointmentId = 1;
			const appointmentDetails = { id: appointmentId };

			expect( updateConciergeAppointmentDetails( appointmentId, appointmentDetails ) ).toEqual( {
				type: CONCIERGE_APPOINTMENT_DETAILS_UPDATE,
				appointmentId,
				appointmentDetails,
			} );
		} );
	} );
} );
