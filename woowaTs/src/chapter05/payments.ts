/*
=== 상황 ===
1. 계좌/앱/카드 각각 다른 api 엔드포인트를 가진다.
2. 각 api는 계좌/앱/카드 결제 수단 정보를 배열 형태를 반환한다.
3. 엔드포인트가 비슷하기 때문에 서버 응답을 처리하는 공통 함수를 생성하고 해당 함수에 타입을 전달해 타입별로 처리 로직을 할 예정
*/

/** 서버에서 받아오는 결제 수단 기본 타입으로 은행과 카드 모두 들어가 있다. */
export interface PayMethodBaseFromRes {
  financialCode: string;
  name: string;
}

/** 은행 관련 결제 수단 타입 */
export interface Bank extends PayMethodBaseFromRes {
  fullName: string;
}

/** 카드 관련 결제 수단 타입 */
export interface Card extends PayMethodBaseFromRes {
  addCardType?: string;
}

/** 프론트에서 관리하는 결제 수단 관련 데이터 */
export interface PayMethodInterface {
  companyName: string;
}

/** 최종적인 은행, 카드 결제 수단 타입 */
export type PayMethodInfo<T extends Bank | Card> = T & PayMethodInterface;
