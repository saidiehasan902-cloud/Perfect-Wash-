/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  CUSTOMER = 'customer',
  OUTLET_MANAGER = 'outlet_manager',
  DELIVERY_STAFF = 'delivery_staff',
  ADMIN = 'admin',
}

export enum OrderStatus {
  PENDING = 'Pending',
  COLLECTING = 'Order Collecting',
  RECEIVED = 'Received',
  START_WASHING = 'Start Washing',
  WASH_PROCESSING = 'Wash Processing',
  READY_FOR_DELIVERY = 'Ready for Delivery',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export enum ServiceType {
  WASH = 'wash',
  IRON = 'iron',
  DRY_CLEAN = 'dry_clean',
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  address?: string;
  outletId?: string; // For managers and delivery staff
  createdAt: number;
}

export interface Outlet {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  managerId: string;
  phone: string;
  status: 'active' | 'inactive';
}

export interface LaundryItem {
  name: string;
  quantity: number;
  pricePerUnit: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  outletId: string;
  status: OrderStatus;
  serviceType: ServiceType;
  items: LaundryItem[];
  totalPrice: number;
  pickupTime: number;
  deliveryTime: number;
  address: string;
  deliveryStaffId?: string;
  createdAt: number;
  updatedAt: number;
  notes?: string;
}

export interface Pricing {
  id: string;
  serviceType: ServiceType;
  basePrice: number;
  unit: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'order_status' | 'system' | 'delivery';
  createdAt: number;
}
